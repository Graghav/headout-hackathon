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
  let tags = req.params.tags.split();

  // Filter the events
  Event.find({ tags: { $in: tags } }, {}, function(err, events) {
    if(err){
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
