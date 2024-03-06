import { useState } from "react";
import NoteContext from "./NoteContext";

//Using "NoteState" file to export state and function which can be passed to any component and components can use these and update.
const NoteState = (props) => {
  const host = "http://localhost:5000";

  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //Get All notes
  const getNotes = async() => {
    //TODO API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token')
      }
    });

    const json = await response.json();
    console.log(json);
    setNotes(json);
}

    //Add a note
    const addNote = async (title, description, tag) => {
      //TODO API CALL
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.

        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token')
        },

        body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
      });
       const note = await response.json();
       setNotes(notes.concat(note)); //concate returns new array // parses JSON response into native JavaScript objects
       console.log(note);

      console.log("Adding a note");

    

      
      //setNotes(notes.push(note));//push updates an array
    };

    //Delete a note
    const deleteNote = async(id) => {
      //TODO API CALL
      
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.

        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token')
        }

      });
      const json = await response.json(); // parses JSON response into native JavaScript objects
      console.log(json);


      console.log("Deleting note with id" + id);
      const newNotes = notes.filter((note) => {
        return note._id !== id;
      });
      setNotes(newNotes);
    };

    //Edit a note
    const editNote = async (id, title, description, tag) => {
      //Api call

      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.

        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token')
        },

        body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
      });
      const json = await response.json(); // parses JSON response into native JavaScript objects
       console.log(json);

       //Since we can't update useState by assgining any values in loop but only by fun(setNotes)
       //so we'll wrap "notes" under "newNotes" and create Deep copy
       //so any changes to "newNotes" we'll reflect back to "notes" 
       //Below is clone 
       let newNotes = JSON.parse(JSON.stringify(notes));
      //Logic that edit in client
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
          break;
        }
      
      }
      console.log(id,notes)
      setNotes(newNotes);
    };

    return (
      //whatever warp under "<NoteContext>" in between that u'll have children
      //exporting state and fun(update)
      //we can use state and fun(update) by importing "NoteContext" in component
      //value={{state,update}}
      <NoteContext.Provider
        value={{ notes, addNote, deleteNote, editNote, getNotes }}
      >
        {props.children}
      </NoteContext.Provider>
    );
  };


export default NoteState;

// const s1 ={
//     "name" : "mayuresh",
//     "class" : "12B"
// }

// const [state, setstate] = useState(s1);

// const update=()=>{

//     setTimeout(() => {

//         setstate({
//             "name" : "warghante",
//             "class" : "22A"
//         })

//     }, 1000);
// }
