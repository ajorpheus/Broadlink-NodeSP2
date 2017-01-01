var express = require('express');
var app = express();

app.get('/', function(req, res){
    console.log(req.query.ip);

var PythonShell = require('python-shell');

var options = {
  mode: 'text',
  pythonPath: '/usr/bin/python',
  scriptPath: '/home/pi/sp2',
  args: [req.query.ip, req.query.mac, req.query.state]
};

PythonShell.run('sp2.py', options, function (err, results) {
  if (err) throw err;
  res.send(results)
  console.log(results);
});
});


app.listen(3000);
console.log('Server running at http://0.0.0.0:3000/');

