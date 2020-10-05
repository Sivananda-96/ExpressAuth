var mongoose = require('mongoose');

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));




var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  favoriteBook: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});


var User = mongoose.model('User', UserSchema);
module.exports = User;