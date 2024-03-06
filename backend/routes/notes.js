const express = require('express');
const Note = require('../models/Note');
const router= express.Router();
const fetchuser= require("../Middleware/fetchuser")
const { body, validationResult } = require("express-validator");



//Route 1 : Get All the Notes using : "/api/notes/fetchallnotes/" , Login required
router.get('/fetchallnotes',fetchuser,async(req,res)=>{

    const notes = await Note.find({user : req.user.id});
    res.json(notes);


})


//Route 2 : Add a note using : "/api/notes/addnote/" , Login required
router.post('/addnote',fetchuser,[
    body("title", "Enter the valid title").isLength({ min: 3 }),
    body("description", "Description must be 5 characters long").isLength({ min: 5 }),], async(req,res)=>{
    try {
        //destructuring
     const {title,description,tag} = req.body;

    const errors = validationResult(req); //it validates request according to array[]
    if (!errors.isEmpty()) {
      //if errors contains errors
      return res.status(400).json({ errors: errors.array() }); //then it send response 400 bad request and errors of an array
    }
    
    //note model obj
   const note = new Note({
    title,
    description,
    tag,
    user : req.user.id

   })

   const savedNote = await note.save();//Saving note obj
   res.json(savedNote);


} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }

})





//Route 3 : update a note using : put "/api/notes/updatenote/id" , Login required
//passing "id" as parameter
router.put('/updatenote/:id',fetchuser,async(req,res)=>{

    //destructuring
    const {title,description,tag}= req.body;

    try {
    //empty obj
    const newNote ={}

    //if title exists then and only add title to "newNote" obj and same for other 
    if(title)
    {
        newNote.title= title;
    }
    if(description)
    {
        newNote.description= description;
    }
    if(tag)
    {
        newNote.tag= tag;
    }

    //find noteId i.e passed parameter whether exist in db or not
    let note = await Note.findById(req.params.id);
    //if not exists
    if(!note)
    {
        return res.status(404).send("Not Found");
    }

    //check passed parameter's userId equals to "fetchuser" userId i.e check user who wants update the note is the same user who logged in.
    //that means one user can't update the note of other user
    //check if user owns the note
    if(note.user.toString() !== req.user.id)
    {
        return res.status(404).send("Not Allowed");
    }

    //updating note
    note = await Note.findByIdAndUpdate(req.params.id,{$set : newNote},{new : true})
    res.json(note);
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
})



//Route 4 : Delete a note using : Delete "/api/notes/deletenote/id" , Login required
//passing "id" as parameter
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{

   try{

    //find noteId i.e passed parameter whether exist in db or not
    let note = await Note.findById(req.params.id);
    //if not exists
    if(!note)
    {
        return res.status(404).send("Not Found");
    }

    //check passed parameter's userId equals to "fetchuser" userId i.e check user who wants update the note is the same user who logged in.
    //that means one user can't update the note of other user
    //check if user owns the note
    if(note.user.toString() !== req.user.id)
    {
        return res.status(404).send("Not Allowed");
    }

    //deleting note
    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"Success" : "Note has been deleted",note : note});
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
})

module.exports=router;