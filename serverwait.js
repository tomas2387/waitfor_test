var http = require('http'),
    wait = require('wait.for'),
    redis  = require("redis"),
    client = redis.createClient();

var server = http.createServer(function(req, res){
    console.log('req!');
    wait.launchFiber(handler,req,res); //handle in a fiber, keep node spinning
}).listen(8000);

function handler(req, res) {
    var instance = wait.for(client.get.bind(client), "hot-1");
    if (!instance) {
        // Si no existía, creamos una nueva clave con valor inicial 1.
        try {
            wait.for(client.set.bind(client), "hot-1", 1);
            console.log('Instance saved!');
        }
        catch(error) { console.log('Error: ' + error); }
    }
    else {
        // Si existía, incrementamos su valor en 1.
        try {
            wait.for(client.incr.bind(client), "hot-1");
            console.log('Instance incremented!');
        }
        catch(error) { console.log('Error: ' + error); }
      }
      
    var body = { status: 'OK', temp:instance };
    res.end(JSON.stringify(body), 'utf-8');
}