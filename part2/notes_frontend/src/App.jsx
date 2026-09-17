import { useState, useEffect } from 'react'
import './index.css'

import Note from './components/Note'
import Footer from './components/Footer'
import Notification from './components/Notification'

import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState(null)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService.getAll().then(initialNotes => setNotes(initialNotes))
  }, [])

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const addNote = (e) => {
    e.preventDefault()

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5
    }

    setNewNote('')

    noteService.create(noteObject)
      .then(newNote => {
        setNotes(notes.concat(newNote))
        setNewNote('')
      })
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(note => note.id === id)
    if(!note) return

    const newImportance = !note.important
    const updatedNote = { ...note, important: newImportance }

    noteService.update(id, updatedNote)
      .then(updatedNote => 
        setNotes(notes => notes.map(note => note.id === id ? updatedNote : note)))
     .catch(() => {
       setErrorMessage(`the note '${note.content}' was already deleted from server`)
       setTimeout(() => setErrorMessage(null), 5000)

       setNotes(notes.filter(n => n.id !== id))
     })
  }

  const handleNoteChange = (e) => setNewNote(e.target.value)

  if(!notes) return null

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>

      <ul>
        {notesToShow.map(note =>
          <Note 
            key={note.id} 
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>

      <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>   

      <Footer />
    </div>
  )
}

export default App
