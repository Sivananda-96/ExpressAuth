var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var session=require('express-session');  //session



//mongodb connection
mongoose.connect('mongodb+srv://newuser:zxcvbbvcxz@cluster0.lg1xs.mongodb.net/user?authSource=admin&replicaSet=atlas-vhgqcd-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },function (err) {
 
    if (err) throw err;
  
    console.log('Successfully connected');
  
 });



 //session for tracking
 app.use(session( {
  secret: 'everyone loves you',
  resave: true,
  saveUninitialized: false
}));


//making userid available in template
app.use(function(req, res, next){
  res.locals.currentUser= req.session.userId;
  next();
});





// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files from /public
app.use(express.static(__dirname + '/public'));

// view engine setup
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// include routes
var routes = require('./routes/index');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// listen on port 3000
app.listen(3000, function () {
  console.log('Express app listening on port 3000');
});
