'use strict';

const config = require('../config');
const request = require('request');

const getTrafficInfo = (req,res,next) => {
  let origin = req.params.origin;
  let dest   = req.params.dest;

  request('https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key='+config.GOOGLE_API_KEY, function(err,response,body){
    if (!error && response.statusCode == 200) {
       res.send(body);
    }
    else {
      console.log(err)
      err = new restify.errors.InternalError(err);
      res.send(err);
     }
  })
}

module.exports = {
  getTrafficInfo: getTrafficInfo
}
