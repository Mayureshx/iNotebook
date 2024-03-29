import React, { useContext ,useState} from 'react'
import notesContext from "../context/notes/NoteContext"

const AddNote = (props) => {

    const context = useContext(notesContext);
    const {addNote} = context;

    const [note, setNote] = useState({title : "", description : "" ,tag : ""})

    const handleClick=(e)=>{
        e.preventDefault();//to not reload page
        addNote(note.title,note.description,note.tag);
        setNote({title : "", description : "" ,tag : ""});
        props.showAlert("Note Added Successfully","success");
    }

    const onChange =(e)=>{

        //let properties of "...note" (Spread Operator) intact and overide or add the properties of "[e.target.name] : e.target.value"
        setNote({...note,[e.target.name] : e.target.value})
    }

    return (
        <div className="container my-3">
            <h1>Add a note</h1>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' value={note.title} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                   
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description'  value={note.description} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag'  value={note.tag} onChange={onChange} minLength={5} required/>
                </div>
                
                <button disabled ={note.title.length<5 || note.description.length<5 } type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote