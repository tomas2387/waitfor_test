var http = require('http'),
    wait = require('wait.for'),
    redis  = require("redis"),
    client = redis.createClient();

var server = http.createServer(function(req, res){
    console.log('req!');
    wait.launchFiber(handler,req,res); //handle in a fiber, keep node spinning
}).listen(8000);

function handler(req, res) {
    client.get("hot-1", function(err, instance){
      if (!instance) {
        // Si no existía, creamos una nueva clave con valor inicial 1.
        client.set ("hot-1", 1, function(error, result) {
          if (error) console.log('Error: ' + error);
          else {
            console.log('Instance saved!');
          }
        });
      }
      else {
        // Si existía, incrementamos su valor en 1.
        client.incr("hot-1", function(error, inst){
          if (error) console.log('Error: ' + error);
          else console.log('Instance incremented!');
        });
      }
      
        var body = { status: 'OK', temp:instance };
        res.end(JSON.stringify(body), 'utf-8');
    });
}