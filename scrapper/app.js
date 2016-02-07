var Xray = require('x-ray');
var x = Xray();
var fs = require('fs');
var path = require('path');
var _  = require('underscore');

var ids = [1866,1884,1896,1872,1868,1870,1894,1892,1879,1874,1864,1867,1878];

_.each(ids, function(id){

  x('https://www.headout.com/tour/'+id,['script'])(function(err,data){

    if(err) throw err;
    var scrapped = JSON.stringify(data);
    var index = scrapped.indexOf('var tourGroup');
    var tmp = scrapped.slice(index,scrapped.length-index);
    var endIndex = tmp.indexOf(';');
    console.log("SCRAPPING FOR ID:"+id)
    var p = path.join(__dirname, 'data');
    fs.writeFile(p+"/"+id+'.txt', tmp, function (err) {
      if (err) return console.log(err);
    });

  })

})
