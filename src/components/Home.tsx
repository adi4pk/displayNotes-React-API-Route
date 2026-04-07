import { useEffect, useState } from "react";
import type { NoteItem } from "../models/NoteItem";
import Note from "./Note";
import { getNotes } from "../services/notesService";
import NoteForm from "./NoteForm";



function Home(){

  const [notes, setNotes] = useState<NoteItem[]>([]);


  useEffect(() =>{
    loadNotes();
  }, []);



  async function loadNotes(){

    let data = await getNotes();

    setNotes(data.notes);
  }


    return(
        <div className="container">
        <header>
          <h1>📝 Notițele Mele</h1>
          <p>Organizează-ți ideile cu stil</p>
        </header>

        <NoteForm>

        </NoteForm>
       

        <div className="notes-grid"
        style={{display: "flex",}}>
            {notes.map((note) => (
              <Note key={note.id} note={note}/>
            ))}
            
        </div>
        
        </div>
    )

}

export default Home;

