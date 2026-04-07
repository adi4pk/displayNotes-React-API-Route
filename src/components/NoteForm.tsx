import type { NoteItem } from "../models/NoteItem";
import { useState } from "react";
import { createNote } from "../services/notesService";

function NoteForm(){

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleAddNote = async () =>{

        let noteObj = {
            title: title,
            content: content,
            categoryId: "cccccccc-cccc-cccc-cccc-cccccccccccc",
            isFavorite: false,
            date: Date.now().toString()
        }

        let data = await createNote(noteObj);
        console.log(data);
    }

    return(
        <>
        <div className="all-notes-content tab-content"
        style={{display: "flex"}}>
            {/* Add Note Section */}
            <div className="add-note-wrapper">
              <input
                type="checkbox"
                id="add-note-toggle"
                className="add-note-toggle"
              />
              <label htmlFor="add-note-toggle" className="add-note-btn">
                ➕ Adaugă Notiță Nouă
              </label>

              <div className="add-note-form">
                <h2
                  style={{
                    marginBottom: 25,
                    color: "#2c3e50",
                    fontSize: "1.8em",
                  }}
                >
                  Creează Notiță Nouă
                </h2>
                <form className="form-container"
                style={{display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                }}>
                  <div className="form-group">
                    <label htmlFor="note-title">Titlu</label>
                    <input
                      type="text"
                      id="note-title"
                      placeholder="Introdu titlul notei..."
                      defaultValue="Notiță Nouă"
                      onChange={event => setTitle(event.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="note-content">Conținut</label>
                    <textarea
                      id="note-content"
                      placeholder="Scrie notița aici..."
                      defaultValue="Aceasta este o notiță nouă. Poți edita acest text."
                      onChange={event => setContent(event.target.value)}
                    />
                  </div>
                  <div className="form-buttons">
                    <label
                      htmlFor="add-note-toggle"
                      className="btn btn-primary"
                      onClick={() => handleAddNote()}
                    >
                      💾 Salvează
                    </label>
                    <label
                      htmlFor="add-note-toggle"
                      className="btn btn-secondary"
                    >
                      ❌ Anulează
                    </label>
                  </div>
                </form>
              </div>
            </div>
            </div>
            </>
    );
     
}

export default NoteForm;