import axios from 'axios';
import { useState } from 'react';

const CreateNote = ({ notes, setNotes }) => {
  const [noteContent, setNoteContent] = useState('');
  const [noteDate, setNoteDate] = useState('');
  const [noteId, setNoteId] = useState('');
  const [relatedNotes, setRelatedNotes] = useState([]);

  let newNote = {
    content: noteContent,
    id: noteId,
    creation_time: noteDate,
    related_notes_ids: relatedNotes,
  };

  const addNewNote = async (event) => {
    const createUrl = 'http://notes.durable.ai:8000/notes';
    event.preventDefault();
    const allNotes = [...notes, newNote];
    const result = await axios.post(
      createUrl,
      {
        headers: { Authorization: 'b5ceb9eb-f4d7-4f0b-9b9b-8bcbf966e07f' },
      },
      allNotes
    );
    setNoteContent('');
    setNoteDate('');
    setNoteId('');
    setRelatedNotes([]);
    console.log(result.data, 'result.data');
    setNotes([...notes, newNote]);
  };

  return (
    <div className="form-container">
      <form className="form">
        <label className="note-text">Note Content</label>
        <input
          id="content"
          name="content"
          placeholder="note content"
          type="text"
          value={noteContent}
          onChange={(e) => {
            setNoteContent(e.target.value);
          }}
        />{' '}
        <label className="note-text">Date</label>
        <input
          id="date"
          name="date"
          type="date"
          placeholder="date"
          value={noteDate}
          onChange={(e) => {
            setNoteDate(e.target.value);
          }}
        />
        <label className="note-text">id</label>
        <input
          id="note-id"
          name="note-id"
          type="number"
          placeholder="note id"
          value={noteId}
          onChange={(e) => {
            setNoteId(e.target.value);
          }}
        />
        <label className="note-text">Related Notes</label>
        <input
          id="related-notes"
          name="related-notes"
          type="number"
          placeholder="enter related notes id"
          value={relatedNotes}
          onChange={(e) => {
            setRelatedNotes(e.target.value);
          }}
        />
        <button onClick={addNewNote} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateNote;
