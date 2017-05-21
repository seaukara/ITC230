var mongoose = require("mongoose");

// remote db connection settings. For security, connectionString should be in a separate file not committed to git
// var connectionString = "mongodb://<USER>:<PASSWORD>@ds015962.mlab.com:15962/<DB_NAME>";
// var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } } };
// mongoose.connect(connectionString, options);

// local db connection settings 
var ip = process.env.ip || '127.0.0.1';
mongoose.connect('mongodb://'+ip+ '/assignment');

var conn = mongoose.connection; 
conn.on('error', console.error.bind(console, 'connection error:'));

// define Book model in JSON key/value pairs
// values indicate the data type of each key
var mySchema = mongoose.Schema({
 day: { type: String, required: true },
 dow: Number,
 taskName: String,
 taskType: String,
 taskTime: String
}); 

// var m = mongoose.model('tasks', mySchema);
// var allTasks = m.find({}, function (err, items) {
//   if (err) return next(err);
//   console.log(items.length);
//   if (items.length == 0) {
//     var Stuff = [{day: "monday", dow: 1, taskName: "adv. javascript", taskType: "class", taskTime: "5:00pm"}, {day: "tuesday", dow: 2, taskName: "java 2", taskType: "class", taskTime: "3:30pm"}, {day: "wednesday", dow: 3, taskName: "adv. javascript", taskType: "class", taskTime: "5:00pm"}, {day: "thursday", dow: 4, taskName: "java for mobile dev", taskType: "class", taskTime: "7:00pm"}, {day: "friday", dow: 5, taskName: "dentist", taskType: "appointment", taskTime: "1:00pm"}, {day: "saturday", dow: 6, taskName: "climb", taskType: "excercise", taskTime: "1:00pm"}, {day: "sunday", dow: 7, taskName: "clean room", taskType: "chores", taskTime: "10:00am"}]
//     m.insert(Stuff);
//     db.find({}, function (err, items) {
//         if (err) return next(err);
//         console.log(items.length);
//         return items;
//     })
// }
//   return items;
//   // other code here
// });



module.exports = mongoose.model('tasks', mySchema);