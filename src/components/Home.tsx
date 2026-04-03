import { useEffect, useState } from "react";
import type { NoteItem } from "../models/NoteItem";
import Note from "./Note";
import { getNotes } from "../services/notesService";



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

        {/* Stats Bar */}
        <div className="stats-bar">
          <div className="stat-item">
            <span className="stat-number">5</span>
            <span className="stat-label">Total Notițe</span>
          </div>
          <div className="stat-item">
           <span className="stat-number">⭐</span>
            <span className="stat-label">Favorite</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <input
          type="radio"
          name="tabs"
          id="tab-all"
          className="tab-toggle"
          defaultChecked
        />
        <input
          type="radio"
          name="tabs"
          id="tab-favorites"
          className="tab-toggle"
        />

        <div className="nav-tabs">
          <label htmlFor="tab-all" className="tab-label">
            📚 Toate Notițele
          </label>
          <label htmlFor="tab-favorites" className="tab-label">
            ⭐ Favorite
          </label>
        </div>

        <div className="tabs-container">
            {notes.map((note) => (
              <Note key={note.id} note={note}/>
            ))}
        </div>
        </div>
    )

}

export default Home;