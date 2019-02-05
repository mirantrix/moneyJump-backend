var express = require('express');
var app = express();

app.get('/', function (req, res){
	res.send('<a href="/upload">Upload Files</a>');
});

app.get('/upload', function (req, res){
	res.send('Select User: ' + "<br>" + 'Choose File: ' + "<br>" + 'UPLOAD');
});


app.listen(8080);
