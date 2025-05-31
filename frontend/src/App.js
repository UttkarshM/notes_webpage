import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/notes';

function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get(API_URL);
      setNotes(res.data);
    } catch (err) {
      console.error('Error fetching notes:', err);
    }
  };

  const addNote = async () => {
    if (!text.trim()) return;

    try {
      const res = await axios.post(API_URL, { text });
      setNotes((prev) => [...prev, res.data]);
      setText('');
    } catch (err) {
      console.error('Error adding note:', err);
    }
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen font-sans">

      <div className="w-[50vw] h-[60vh] bg-slate-300 p-5 ">
      <h2 className="text-2xl font-bold mb-[5rem] text-center underline">Notes</h2>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Note..."
          className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addNote}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>

      <ul className='overflow-y-auto h-[40vh] mt-[3rem]'>
        {notes.map((note) => (
          <li
            key={note.id}
            className="mb-2 flex justify-between items-center bg-gray-100 px-3 py-2 rounded m-4"
          >
            <span>{note.text}</span>
            <button
              onClick={() => deleteNote(note.id)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default App;
