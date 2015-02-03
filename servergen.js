var http = require('http'),
    redis  = require("redis"),
    Q  = require("q"),
    client = redis.createClient();
    
    
var server = http.createServer(function(req, res){
    console.log('req!');
    handler(req,res);
}).listen(8000);

function handler(req, res) {
    var instance = Q.async(function* () {
       yield client.get("hot-1");
    });
    console.log(instance);
    if (!instance) {
        // Si no existía, creamos una nueva clave con valor inicial 1.
        try {
            client.set ("hot-1", 1);
            console.log('Instance saved!');
        }
        catch(error) { console.log('Error: ' + error); }
      }
      else {
        // Si existía, incrementamos su valor en 1.
        try {
            client.incr("hot-1");
            console.log('Instance incremented!');
        }
        catch(error) { console.log('Error: ' + error); }
      }
      
        var body = { status: 'OK', temp:instance };
        res.end(JSON.stringify(body), 'utf-8');
}

