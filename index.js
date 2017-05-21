'use strict';

var express = require("express");
var app = express();
var db = require('./models/tasks');
var tasks = require('./lib/tasks.js');
var mongoose = require("mongoose");
var handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}, defaultLayer: 'home'));
app.set("view engine", ".html");

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(require("body-parser").urlencoded({extended: true})); // parse form submissions


console.log(db)

// var t = db.mongoose.model('tasks')
// return all records
var allTasks = db.find({}, function (err, items) {
    if (err) return next(err);
    console.log(items.length);
    if (items.length == 0) {
        var Stuff = [{day: "monday", dow: 1, taskName: "adv. javascript", taskType: "class", taskTime: "5:00pm"}, {day: "tuesday", dow: 2, taskName: "java 2", taskType: "class", taskTime: "3:30pm"}, {day: "wednesday", dow: 3, taskName: "adv. javascript", taskType: "class", taskTime: "5:00pm"}, {day: "thursday", dow: 4, taskName: "java for mobile dev", taskType: "class", taskTime: "7:00pm"}, {day: "friday", dow: 5, taskName: "dentist", taskType: "appointment", taskTime: "1:00pm"}, {day: "saturday", dow: 6, taskName: "climb", taskType: "excercise", taskTime: "1:00pm"}, {day: "sunday", dow: 7, taskName: "clean room", taskType: "chores", taskTime: "10:00am"}]
        db.insertMany(Stuff);
        db.find({}, function (err, items) {
            if (err) return next(err);
                console.log(items.length);
                return items;
            })
        return items;
    }
    return items;
    console.log(items)
    // other code here
});
console.log(allTasks)

// send static file as response

// app.get('/', function (req, res) {
//     res.type('text/html');

//     res.sendFile(__dirname + '/public/home.html');
// });
app.get('/', function(req,res){

    //res.setHeader('Content-Type', 'text/plain');
    var children = tasks.getAll(db);
    console.log(children);


    

    res.render('home', {children:children});

});

// send plain text response
app.get('/about', function (req, res) {

    res.render('about');
});

app.get('/addNew', function (req, res) {
    res.render('addNew');
});


app.get('/get', function (req, res) {
    console.log(req.query);
    var result = tasks.getDay(req.query.day, db);
    res.render('details', {result: result} );
    console.log(req.query); // display parsed querystring object
});


app.get('/delete', function (req, res) {
    //res.type('text/plain');
    var removed = tasks.removeTask(req.query.day, db);
    var message = "Tasks for " + req.query.day + " were removed. There are " + removed + " tasks remaining."
    res.render('delete', {info : message})
    //res.type('text/plain');
    //res.send("Tasks for " + req.query.day + " were removed. There are " + removed + " tasks remaining.");
});



app.get('/add', function (req, res) {


    var add = tasks.addTask(req.query.day, req.query.dow, req.query.taskName, req.query.taskType, req.query.taskTime, db);
    if (add === "FAIL") {
        var day = req.query.day;
        var result = tasks.getDay(day, db);
        res.render('currentlyExists', {result: result});
    } else {
        res.type('text/plain');
        res.send("Tasks for " + req.query.day + " were added. There are " + add + " tasks remaining.");
    }

});

app.post('/get', function (req, res) {

    var day = req.body.day;
    var result = tasks.getDay(req.body.day, db);
    if (!result || result==="NONE") {
        result = [];
        result.missing = result
        //result = "There are currently no tasks for this day"
        res.render('details', {result:result})
    }else {

        res.render('details', {result:result, day: result.day});
    } 


    
    
});

// define 404 handler
app.use(function (req, res) {
    res.type('text/plain');
    res.status(404);
    res.send("Page not found");
});

app.listen(app.get('port'), function () {
    console.log('Express started');
});






// var http = require("http"), fs = require('fs'), qs = require("querystring"); // specify which modules will be required by the index.js - this assignment adds querystring to allow us to manage and interpret routes
// let tasks = require("C:\\node\\ITC230\\widgets\\tasks.js"); // we will also require a custom module that will hold are list

// function serveStatic(res, path, contentType, responseCode){
//   if(!responseCode) responseCode = 200;
//   fs.readFile(__dirname + path, function(err, data){
//       if(err){
//         res.writeHead(500, {'Content-Type': 'text/plain'});
//         res.end('Internal Server Error');
//       }
//       else{
//         res.writeHead(responseCode, {'Content-Type': contentType});
//         res.end(data);
//       }
//   });
// }


// http.createServer(function(req,res){
    
//     let url = req.url.split("?"); // to handle the routes, the url will be assigned to a variable and then split into sections based on a key character
//     let params = qs.parse(url[1]); // take the remaining url [1] (this is the second piece of the url that was split by the ?) and assign each parsed out word to the object params
//     var path = req.url.toLowerCase(); // change all letters to lower case
//     path = path.split("?")[0];
    
//     console.log(params);
//     console.log(path);

    
//     switch(path) { // using a switch statement, set up possible cases for what the url looks like
            
//         case '/': // if the only character is /, then send the application to it's homepage
//                 serveStatic(res, '/public/home.html', 'text/html');
//                 break;

//         case '/about': // if about follows the ?/ in the url, then send the application to a blank page and populate it with the following about text
//                 res.writeHead(200, {'Content-Type': 'text/plain'});
//                 res.end('This is Kara Manseaus node application page - take a gander, its real interesting');
//                 break;

//         case '/get': // if the get route is identified, then there will also be a day of the week at the tail end that will then be searched for using the get method of the tasks module
//                 console.log("inside get - define params.day = " + params.day);
//                 let found = tasks.getDay(params.day); // call the get function from the tasks module
//                 res.writeHead(200, {'Content-Type': 'text/plain'}); // return a 200 code and specify a content type of text
//                 res.end('Results for ' + params.day + "\n" + JSON.stringify(found)); // define the returned text and use the stringify method to convert the found respond to string characters
//                 break;

//         case '/delete': // delete will have a day of the week attached to it as well - this route will call the remove method from the tasks module and delete a task from the list
//                 let removed = tasks.removeTask(params.day);
//                 console.log("Tasks for " + params.day + " were removed. There are " + removed + " tasks remaining.")
//                 res.writeHead(200, {'Content-Type': 'text/plain'});
//                 res.end("Tasks for " + params.day + " were removed. There are " + removed + " tasks remaining.");
//                 break;

//         case '/add': // add will have a day of the week attached to it as well - this route will call the insert method from the tasks module and delete a task from the list
//                 let added = tasks.addTask(params.day, params.dow, params.taskName, params.taskType, params.taskTime);
//                 res.writeHead(200, {'Content-Type': 'text/plain'});
//                 res.end("There was a new task added to " + params.day + ". There are now " + added + " tasks.");
//                 break;
            
//     default: // else, anything else will get sent to 404: Page not found
//             res.writeHead(404, {'Content-Type': 'text/plain'});
//             res.end('404:Page not found.');
//   }
  
// }).listen(process.env.PORT || 3000);

// require(["esri/map"], function(Map) {
//     map = new map("map", {
//         center: [-79.33216476440182, 36],
//         showLabels : true,
//         zoom: 12,
//         zoomScale: 5000000,
//         basemap: "topo",
//         infoWindow: this.popup
//     });
//     return map
// };
