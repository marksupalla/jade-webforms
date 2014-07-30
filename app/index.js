'use strict';

var morgan = require('morgan');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res){
  res.render('home');
});

app.get('/calc', function(req, res){
  res.render('calc');
});

app.post('/calc', function(req, res){
  var ops = 0;
  var sum = (req.body.x*1)+(req.body.y*1);
  var sub = (req.body.x*1)-(req.body.y*1);
  var mul = (req.body.x*1)*(req.body.y*1);
  var div = (req.body.x*1)/(req.body.y*1);
    if(req.body.t === '+'){
      ops=sum;
    }else if(req.body.t === '-'){
      ops=sub;
    }else if(req.body.t === '*'){
      ops=mul;
    }else{
      ops=div;
    }
  console.log(req.body); 
  res.render('calc', {sum:sum, ops:ops, t:req.body.t});
});

app.get('/boxes', function(req, res){
  res.render('boxes');
});

app.post('/boxes', function(req, res){
  var b = parseInt(req.body.b);
  var l = req.body.l.split('-');
  var w = req.body.w.split('-');
  var c = req.body.c.split(',');
  
  l = l.map(function(x){
    return l * 1;
  });
  
  w = w.map(function(x){
    return w * 1;
  });
  
  c = c.map(function(x){
    return c * 1;
  });

  for(var i = 0; i < b; i++){
  w = Math.floor(Math.random() * (w[1] - w[0]))-w[0];
  l = Math.floor(Math.random() * (l[1] - l[0]))-l[0];
  c = Math.floor(Math.random() * req.body.c.length);
}

  res.render('results', {b:b, l:l, w:w, c:c,});
});

var port = process.env.PORT;

app.listen(port, function(){
  console.log('Express is now listening on PORT', port);
});
