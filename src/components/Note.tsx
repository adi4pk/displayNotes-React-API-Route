import { useState } from "react";
import type { NoteItem } from "../models/NoteItem";
import { Link, useNavigate } from "react-router-dom";


type NoteProps={
    note: NoteItem;
    // onEdit: (note:NoteItem) => void;
}


function Note({note}:NoteProps){

  let navigate = useNavigate();

  let goToEditNote = () => {
    navigate("/editNote")
  }
  
    return(
        <>
            <div key={note.id} className="note-wrapper"
            style={{display: "flex",
              alignItems: "center",
            }}>
        <input
          type="checkbox"
          id="delete-note-1"
          className="action-toggle delete-toggle"
        />
        <input type="checkbox" id="favorite-1" className="favorite-toggle" />
        <div className="note-card">
          <div className="note-header">
            <h3 className="note-title">{note.title}</h3>
            <label htmlFor="favorite-1" className="favorite-star">
              ⭐
            </label>
          </div>
          <p className="note-date">📅 {note.date}</p>

          <input
            type="checkbox"
            id="edit-note-1"
            className="action-toggle edit-toggle"
          />

          <p className="note-content">{note.content}</p>

          <div className="note-actions">
            <label htmlFor="edit-note-1" className="action-btn edit-btn">
              <Link to={`/editNote/${note.id}`}>✏️ Editează</Link>
              
            </label>
            <label
              htmlFor="delete-note-1"
              className="action-btn delete-btn"
            //   onClick={() => removeNote(index)}
            >
              🗑️ Șterge
            </label>
          </div>

          <div className="edit-form">
            <div className="form-group">
              <label>Titlu</label>
              <input type="text" defaultValue={note.title} />
            </div>
            <div className="form-group">
              <label>Conținut</label>
              <textarea value={note.content} />
            </div>
            <div className="form-buttons">
              <label htmlFor="edit-note-1" className="btn btn-primary">
                💾 Salvează
              </label>
              <label htmlFor="edit-note-1" className="btn btn-secondary">
                ❌ Anulează
              </label>
            </div>
          </div>

          <span className="note-tag tag-work">{note.categoryId}</span>
        </div>
      </div>
        
        </>
    )

}

export default Note;