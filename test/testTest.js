let tasks = require("../lib/tasks.js");
let expect = require("chai").expect;


describe('query function', () => {
	it("get returns requested dow", function() {
        let result = tasks.getDay("monday");
        expect(result).to.deep.equal({day: "monday", dow: 1, taskName: "adv. javascript", taskType: "class", taskTime: "5:00pm"});
    });
    it("get fails /w invalid dow", () => {
        let result = tasks.getDay("fake");
        expect(result).to.be.undefined;
    });
});

describe('delete method', () => {
	it("removeTask removes  item and returns remaining count", function() {
		let result = tasks.getDay("monday");
		expect(result).to.deep.equal({day: "monday", dow: 1, taskName: "adv. javascript", taskType: "class", taskTime: "5:00pm"});
        		result = tasks.removeTask("monday");
        		result = tasks.getDay("monday");
		expect(result).to.be.undefined;
    	});
	it("remove task fails", () => {
		let count = tasks.removeTask("tuesday");
		let result = tasks.removeTask("fake");
		expect(result).to.be.equal(count);
    });
});

describe('add method', () => {

	it("addTask adds  item and returns remaining count", function() {

        		let result = tasks.getDay("monday");
		expect(result).to.be.undefined;

		result = tasks.addTask("monday", 1, "adv. javascript", "class", "5:00pm");
		result = tasks.getDay("monday");
		expect(result).to.deep.equal({day: "monday", dow: 1, taskName: "adv. javascript", taskType: "class", taskTime: "5:00pm"});
   	 });
	it("addTask adds  fails", function() {

        		let result = tasks.getDay("wednesday");
		result = tasks.addTask("wednesday", 1, "BOOGIE", "BOOGIE", "BOOGIE");
		expect(result).to.be.equal("FAIL");
   	 });
});