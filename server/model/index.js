"use strict";

const mongoose      = require('mongoose');
const config        = require('../config');
const db            = mongoose.connect(config.MONGO_AUTH);
const Schema        = mongoose.Schema;

// Schema for events
const eventSchema = new Schema({
  name        : String, // Name of the event
  location    : {  type: [Number],  index: '2d'}, // GPS co-ordinates of the event
  city        : String,
  address     : String,
  price       : Number,
  currency    : String,
  description : String,
  tags        : [],
  begin_time  : [],
  end_time    : String,
  image       : String,
  days        : [], // In what days the event occurs
  total_time  : Number  // Total min of the event
});

// Schema for the user's customized event
const userEventSchema = new Schema({
  user_id     : String,
  begin_time  : String, // Begin time of the complete event
  end_time    : String,
  total_time  : Number, // Total min of the event
  events      : [], // Holds all the event objects
  current_status: [] // Holds the history of the events completed/cancelled
})

// Export the schema to register with MongoDB
module.exports = {
  Event    :  mongoose.model('Event', eventSchema),
  UserEvent:  mongoose.model('UserEvent', userEventSchema)
}
