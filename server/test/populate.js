const events  = require("./events");
const Event   = require('../model').Event;
const _       = require("underscore");

_.each(events, function(event){
  Event(event).save(function(err,res){
    if(!err) {
      console.log("EVENT SAVED : "+event.name);
    }
  })
});
