var schedule = require('node-schedule');

var rule = new schedule.RecurrenceRule();

rule.minute = new schedule.Range(0, 59, 5);
//rule.second = new schedule.Range(0,55,5);

schedule.scheduleJob(rule, function(){
    console.log(new Date());
});

module.exports = schedule;