import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

import CreateNote from './components/CreateNote';

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios('http://notes.durable.ai:8000/notes', {
      headers: { Authorization: 'b5ceb9eb-f4d7-4f0b-9b9b-8bcbf966e07f' },
    })
      .then((response) => {
        setNotes(response.data);
        console.log(response.data, 'data');
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <h1 className="title"> Notes App</h1>
      <div className="notes-container">
        {notes.map((note) => (
          <div className="note-card" key={note.id}>
            <p> Content:{note.content}</p>
            <p> Related Notes: {note.related_note_ids}</p>
          </div>
        ))}
      </div>
      <div className="create-note-section">
        <CreateNote notes={notes} setNotes={setNotes} />
      </div>
    </div>
  );
}

export default App;
