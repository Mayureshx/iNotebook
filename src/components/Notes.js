import React, { useContext, useEffect, useRef ,useState} from 'react'
import notesContext from "../context/notes/NoteContext"
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(notesContext);
    const {notes,getNotes,editNote} = context;

    const [note, setNote] = useState({id : "",etitle : "", edescription : "" ,etag : ""})

    let navigate = useNavigate();


    useEffect(() => {
      if(localStorage.getItem('token'))
      {
        getNotes();
      }
      else{
        navigate("/login");
      }
    
      // eslint-disable-next-line
    }, [])

     const ref = useRef(null);//Used to give reference to element.
     const refClose = useRef(null);

    const updateNote=(currentNote)=>{

        ref.current.click();//means where ref is pointing and click the element(i.e button)
        setNote({id : currentNote._id, etitle : currentNote.title, edescription : currentNote.description, etag : currentNote.tag});
    }


    const handleClick=(e)=>{
        console.log("Updating a note",note)
        editNote(note.id,note.etitle,note.edescription,note.etag);
        refClose.current.click();
        // e.preventDefault();//to not reload page
        props.showAlert("Updated Successfully!!!","success");
      
    }

    const onChange =(e)=>{

        //let properties of "...note" (Spread Operator) intact and overide or add the properties of "[e.target.name] : e.target.value"
        setNote({...note,[e.target.name] : e.target.value})
    }


    
  return (

    <>
    <AddNote showAlert= {props.showAlert}/>

   {/* This is a Modal */}

    <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

{/* modal is primarily hidden ,it will  launch when click on edit icon it will trigger above button which call this below modal  */}
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">

       {/* Form */}
      <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                   
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                </div>
                
        
            </form>
     
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
        <button disabled ={note.etitle.length<5 || note.edescription.length<5 } type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
      </div>
    </div>
  </div>
</div>

    <div className="row my-3">
    <h1>Your Notes</h1>
    <div className="conainer mx-2">
    {notes.length===0 && 'No notes to display'}
    </div>
    {notes.map((note)=>{
        return <Noteitem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert}/>;
    })}
    </div>
    </>
  )
}

export default Notes;