const mongoose = require('mongoose');
const { Schema } = mongoose;//defining schema

const NotesSchema = new Schema({

     //Its ascts as a forgeinkey in Notes 
     //like one user can have many notes
     user :
     {
        type : mongoose.Schema.Types.ObjectId,//Store userId
        ref : 'user' //reference of "user" model
     },
   title :{
    type : String,
    required : true
   },
   description :{
    type : String,
    required : true

   },
   tag :{
    type : String,
    default : "General"
   },
   Date :{
    type : Date,
    default : Date.now
   }
  });

  module.exports = mongoose.model("notes",NotesSchema);//exporting mongoose model to use it and "user" is model name and "UserSchema" is SCHEMA NAME 