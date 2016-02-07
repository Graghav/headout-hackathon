'use strict';

const Event   = require('../model').Event;

const getAllEvents = (req,res,next) => {
  // Get all the events from the DB
  Event.find({}, {}, function(err, events){
    if(err){
      err = new restify.errors.InternalError(err);
      res.send(err);
    }
    else {
      res.send(events);
    }
  });
};

const filterEvents = (req,res,next) => {
  let tags = req.params.tags;
  let ntags = req.params.ntags;
  // Filter the events
  Event.find({  $and: [ { tags: { $in: tags } }, { tags: { $nin: ntags } }] } , {}, function(err, events) {
    if(err){
      console.log(err)
      err = new restify.errors.InternalError(err);
      res.send(err);
    }
    else {
      res.send(events);
    }
  });
};

module.exports = {
  getAllEvents: getAllEvents,
  filterEvents: filterEvents
}
