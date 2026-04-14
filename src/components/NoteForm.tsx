import type { NoteItem } from "../models/NoteItem";
import { useState } from "react";
import { createNote } from "../services/notesService";
import { useNavigate } from "react-router-dom";
import type { CreateNoteRequest } from "../models/CreateNoteRequest";

function NoteForm(){

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    let navigate = useNavigate();

    let goToHome = () => {
      navigate('/main');
    }

    const handleAddNote = async () =>{

        let noteObj: CreateNoteRequest = {
            title: title,
            content: content,
            categoryId: "cccccccc-cccc-cccc-cccc-cccccccccccc",
            isFavorite: false,
            // date: Date.now().toString()
            date: "2026-04-07T19:12:10.774Z"
        }

        let data = await createNote(noteObj);
 goToHome();
        console.log(data);
    }

    return(
        <>
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
                  <div className="form-group"
                  style={{display: "flex",
                    flexDirection: "column",
                  }}>
                    <label htmlFor="note-title"
                    style={{textAlign:"start",}}>Titlu</label>
                    <input
                      type="text"
                      id="note-title"
                      placeholder="Introdu titlul notei..."
                      defaultValue="Notiță Nouă"
                      style={{
                        border: "2px solid salmon",
                      height: "30px",
                      borderRadius: "5px",
                      }}
                      // value={title}
                      onChange={event => setTitle(event.target.value)}
                    />
                  </div>
                  <div className="form-group"
                  style={{display: "flex",
                    flexDirection: "column",
                  }}>
                    <label htmlFor="note-content"
                    style={{textAlign:"start",
                    }}>
                      Conținut</label>
                    <textarea
                      id="note-content"
                      placeholder="Scrie notița aici..."
                      defaultValue="Aceasta este o notiță nouă. Poți edita acest text."
                      style={{
                        border: "2px solid salmon",
                      borderRadius: "5px",
                      width: "400px",
                      height: "120px",
                      }}
                      onChange={event => setContent(event.target.value)}
                    />
                  </div>
                  <div className="form-buttons">
                    <label
                      htmlFor="add-note-toggle"
                      className="btn btn-primary"
                      onClick={() => {
                        handleAddNote();
                        
                      }}
                    >
                      💾 Salvează
                    </label>
                    <label
                      htmlFor="add-note-toggle"
                      className="btn btn-secondary"
                      onClick={() => goToHome()}
                    >
                      ❌ Anulează
                    </label>
                  </div>
                </form>
              </div>
            </>
    );
     
}

export default NoteForm;