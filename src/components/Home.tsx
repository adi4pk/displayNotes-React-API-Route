import { useEffect, useState } from "react";
import type { NoteItem } from "../models/NoteItem";
import Note from "./Note";
import { getNotes } from "../services/notesService";
import NoteForm from "./NoteForm";
import { useNavigate } from "react-router-dom";
import { getNoteById } from "../services/notesService";


function Home(){

  const [notes, setNotes] = useState<NoteItem[]>([]);


  useEffect(() =>{

    loadNotes();
  }, []);


  const navigate = useNavigate();

  let goToAddNote = () => {
    navigate("/addNote");
  }

  

  async function loadNotes(){
    let data = await getNotes();
    setNotes(data.notes);
    console.log(data.notes);
  }

  // const [currentNote, setCurrentNote]=useState<NoteItem | null>(null);
  // function handleEditNoteBtn(note: NoteItem){
  //   console.log(note);
  //   setCurrentNote(note);
  //   console.log(`current note is ${note}`);
  // }  ---- ONLY for PROPS

return(
        <div className="container">
        <header>
          <h1>📝 Notițele Mele</h1>
          <p>Organizează-ți ideile cu stil</p>
        </header>
        
       <div className="all-notes-content tab-content"
        style={{display: "flex"}}>
            {/* Add Note Section */}
            <div className="add-note-wrapper">
              <label htmlFor="add-note-toggle" className="add-note-btn"
              >
                <span
                style={{
          border: "2px solid salmon",
          height: "30px",
          borderRadius: "5px",
        }}
        onClick={() => goToAddNote()}>
          ➕ </span>
          Adaugă Notiță Nouă
              </label>
            </div>
            </div>
            

        <div className="notes-grid"
        style={{display: "flex",}}>
            {notes.map((note) => (
              <Note 
              key={note.id} 
              note={note}
              // onEdit={handleEditNoteBtn}
              />
            ))}
            
        </div>
        
        </div>
    )


    
  }

    


export default Home;

