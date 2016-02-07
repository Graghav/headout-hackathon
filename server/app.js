"use strict";

const restify = require('restify');
const config  = require('./config');
const controller  = require('./controllers');

const server = restify.createServer({
  name: 'headout-event-service',
  version: '0.1.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

// Enable CORS for the Server
server.use(
  function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }
);

server.get('/', function(req,res) {
  res.send({ status: "Up" });
});

// Routes for the actions
server.get('/events/all', controller.EVENT.getAllEvents);
server.post('/events/filter', controller.EVENT.filterEvents);

// If this service run as a standalone app
if (!module.parent) {
    server.listen(config.IP, function () {
      console.log('Headout Event Service listening at %s', server.url);
    });
} else {
    module.exports = server;
}
