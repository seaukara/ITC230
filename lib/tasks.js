// tasks is set up to define the list and then to create methods that then will interact with the list in a controlled way from outside sources

'use strict' // still not totally sure what this means


let tasks = [
    {day: "monday", dow: 1, taskName: "adv. javascript", taskType: "class", taskTime: "5:00pm"},
    {day: "tuesday", dow: 2, taskName: "java 2", taskType: "class", taskTime: "3:30pm"},
    {day: "wednesday", dow: 3, taskName: "adv. javascript", taskType: "class", taskTime: "5:00pm"},
    {day: "thursday", dow: 4, taskName: "java for mobile dev", taskType: "class", taskTime: "7:00pm"},
    {day: "friday", dow: 5, taskName: "dentist", taskType: "appointment", taskTime: "1:00pm"},
    {day: "saturday", dow: 6, taskName: "climb", taskType: "excercise", taskTime: "1:00pm"},
    {day: "sunday", dow: 7, taskName: "clean room", taskType: "chores", taskTime: "10:00am"},
];



let getAll = () => {
    var item, list = [];


    tasks.forEach(function (item) {
        //console.log(item);
        list.push(item.day);
    });

    //     //console.log(tasks["monday"]);
    console.log(list);


    // };
    return list
};

let getDay = (day) => {
    console.log(tasks)
    try {
        return tasks.find((item) => {
            return item.day == day;
        });
        console.log(day);
    } catch(Exception) {
        return "There are currently no tasks scheduled for this day";
    };
};


let filterTask = (day) => {
    return tasks.filter((val) => {
        return val.day !== day;
    });
    console.log(tasks);
};

let removeTask = (day) => {
    tasks = filterTask(day);
    return tasks.length;
};


let addTask = (dayNew, dowNew, taskNameNew, taskTypeNew, taskTimeNew) => {


    let check = getDay(dayNew);
    try {
        if (check.taskTime) {
            console.log("what")
            return "FAIL"
        }
    } catch (Exception) {
        console.log("can continue");
    }
    
    let newTask = {
        day: dayNew,
        dow: dowNew, 
        taskName: taskNameNew,
        taskType: taskTypeNew,
        taskTime: taskTimeNew
    };
    try{

        tasks = tasks.concat([newTask]);
        return tasks.length;
    } catch (Exception) {
        console.log(fail);
    }

};

//console.log(getDay("wednesday"));
//console.log(removeTask("wednesday"));
//console.log(getDay("wednesday"));

module.exports = {
    getAll, getDay, removeTask, addTask
};