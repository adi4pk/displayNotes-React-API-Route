import type { NoteItem } from "../models/NoteItem";
import { use, useEffect, useState } from "react";
import { createNote } from "../services/notesService";
import { useNavigate, useParams } from "react-router-dom";
import type { CreateNoteRequest } from "../models/CreateNoteRequest";
import { getNoteById } from "../services/notesService";
import { updateNote } from "../services/notesService";

function EditNote(){

let navigate = useNavigate();
const {id} = useParams();
const [currentNote, setCurrentNote] = useState<NoteItem> ();
const [noteTitle, setNoteTitle] = useState("");
const [noteContent, setNoteContent] = useState("");
const [noteCategory, setNoteCategory] = useState("");
const [isFavorite, setIsFavorite] = useState(Boolean);
const [noteDate, setNoteDate] = useState("");

useEffect(() => {
    // console.log(currentNote);
    fetchNote();
    
}, [])

let goToHome = () =>{
    navigate('/main');
}

async function fetchNote(){
    
    let thisNote = await getNoteById(id??"");
    setCurrentNote(thisNote);
    setNoteTitle(thisNote.title);
    setNoteContent(thisNote.content);
    setNoteCategory(thisNote.categoryId);
    setIsFavorite(thisNote.isFavorite);
    setNoteDate(thisNote.date);
}

async function editNote(){

    if(currentNote !==null){
        let noteObj={
        title: noteTitle,
        content: noteContent,
        categoryId: noteCategory,
        isFavorite: isFavorite,
        date: noteDate,
    }
    console.log(noteObj);
    

    await updateNote(currentNote?.id+"", noteObj);
    goToHome()
    }

   
    // goToHome();

    // setNoteTitle(noteObj.title);
    // setNoteContent(noteObj.content);
    // setNoteCategory(noteObj.categoryId);
    // setIsFavorite(noteObj.isFavorite);
    // setNoteDate(noteObj.date);

    
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
                      defaultValue={currentNote?.title}
                      style={{
                        border: "2px solid salmon",
                      height: "30px",
                      borderRadius: "5px",
                      }}
                    //   value={currentNote?.title}
                      onChange={(event) => setNoteTitle(event.target.value)}
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
                      defaultValue={currentNote?.content}
                      style={{
                        border: "2px solid salmon",
                      borderRadius: "5px",
                      width: "400px",
                      height: "120px",
                      }}
                    //   value={currentNote?.content} ----
                      onChange={(event) => setNoteContent(event.target.value)}/>
                  </div>
                  <div className="form-buttons">
                    <label
                      htmlFor="add-note-toggle"
                      className="btn btn-primary"
                      onClick={() => editNote()}
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
              </div></>
)

}

export default EditNote;