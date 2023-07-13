const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({

  question: {type: String,required: true},
  isDeleted:{type: Boolean,default:false},

});

module.exports = mongoose.model('Question', questionSchema);
