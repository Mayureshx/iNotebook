const mongoose = require('mongoose');
const { Schema } = mongoose;//defining schema

const UserSchema = new Schema({

 
   name :{
    type : String,
    required : true
   },
   email :{
    type : String,
    required : true,
    unique : true
   },
   password :{
    type : String,
    required : true
   },
   Date :{
    type : Date,
    default : Date.now
   }
  });

  const User = mongoose.model("user",UserSchema);//exporting mongoose model to use it and "user" is model name and "UserSchema" is SCHEMA NAME 

  module.exports = User; 