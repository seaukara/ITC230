'use strict'
var http = require("http"), fs = require('fs'), qs = require("querystring"); // specify which modules will be required by the index.js - this assignment adds querystring to allow us to manage and interpret routes
let tasks = require("/Users/karamanseau/ITC230/widgets/tasks.js"); // we will also require a custom module that will hold are list

function serveStatic(res, path, contentType, responseCode){
  if(!responseCode) responseCode = 200;
  fs.readFile(__dirname + path, function(err, data){
      if(err){
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
      }
      else{
        res.writeHead(responseCode, {'Content-Type': contentType});
        res.end(data);
      }
  });
}


http.createServer(function(req,res){
    
    let url = req.url.split("?"); // to handle the routes, the url will be assigned to a variable and then split into sections based on a key character
    let params = qs.parse(url[1]); // take the remaining url [1] (this is the second piece of the url that was split by the ?) and assign each parsed out word to the object params
    var path = req.url.toLowerCase(); // change all letters to lower case
    path = path.split("?")[0];
    
    console.log(params);
    console.log(path);

    
    switch(path) { // using a switch statement, set up possible cases for what the url looks like
            
        case '/': // if the only character is /, then send the application to it's homepage
                serveStatic(res, '/public/home.html', 'text/html');
                break;

        case '/about': // if about follows the ?/ in the url, then send the application to a blank page and populate it with the following about text
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end('This is Kara Manseaus node application page - take a gander, its real interesting');
                break;

        case '/get': // if the get route is identified, then there will also be a day of the week at the tail end that will then be searched for using the get method of the tasks module
                console.log("inside get - define params.day = " + params.day);
                let found = tasks.getDay(params.day); // call the get function from the tasks module
                res.writeHead(200, {'Content-Type': 'text/plain'}); // return a 200 code and specify a content type of text
                res.end('Results for ' + params.day + "\n" + JSON.stringify(found)); // define the returned text and use the stringify method to convert the found respond to string characters
                break;

        case '/delete': // delete will have a day of the week attached to it as well - this route will call the remove method from the tasks module and delete a task from the list
                let removed = tasks.removeTask(params.day);
                console.log("Tasks for " + params.day + " were removed. There are " + removed + " tasks remaining.")
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end("Tasks for " + params.day + " were removed. There are " + removed + " tasks remaining.");
                break;

        case '/add': // add will have a day of the week attached to it as well - this route will call the insert method from the tasks module and delete a task from the list
                let added = tasks.addTask(params.day, params.dow, params.taskName, params.taskType, params.taskTime);
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end("There was a new task added to " + params.day + ". There are now " + added + " tasks.");
                break;
            
    default: // else, anything else will get sent to 404: Page not found
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('404:Page not found.');
  }
  
}).listen(process.env.PORT || 3000);