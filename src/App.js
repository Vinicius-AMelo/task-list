import React, { useState, useEffect } from 'react'
import { FaPlus } from 'react-icons/fa'
import { nanoid } from 'nanoid'
import NoteList from './components/notelist'
import './App.css'

// let numberID
export default function App() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem('Notas')) || []
  )
  const [note, setNote] = useState({ value: '' })

  function addNote(event) {
    event.preventDefault()
    const newNote = {
      id: nanoid(),
      title: note.value,
      selected: false,
    }

    setNotes((oldNotes) => (newNote.title ? [...oldNotes, newNote] : oldNotes))
    setNote({ value: '' })
  }

  function handle(e) {
    if (e.key === 'Enter') {
      addNote(e)
    }
  }
  function handleChange(event) {
    setNote((oldNote) => ({
      ...oldNote,
      [event.target.name]: event.target.value,
    }))
  }

  function currentTask(id) {
    setNotes((oldNotes) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      oldNotes.map((oldNote) => {
        if (id === oldNote.id) {
          setNote({ value: oldNote.title })
          return { ...oldNote, selected: true }
        }
        return { ...oldNote, selected: false }
        // eslint-disable-next-line prettier/prettier
      }))
    // eslint-disable-next-line array-callback-return
  }

  function deleteNote(id) {
    setNote({ value: '' })
    // eslint-disable-next-line array-callback-return
    notes.map((noteMapped) => {
      if (
        noteMapped.id === id
        // && noteMapped.selected
      ) {
        notes.splice(
          notes.findIndex((index) => index.id === id),
          1
        )
        setNotes((oldNotes) => oldNotes)
      }
    })
  }

  function updateNote(id) {
    setNote({ value: '' })
    setNotes((oldNotes) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      oldNotes.map((oldNote) => {
        if (oldNote.id === id && oldNote.selected && note.value) {
          return { ...oldNote, title: note.value, selected: !oldNote.selected }
        }
        return { ...oldNote }
        // eslint-disable-next-line prettier/prettier
      }))
  }
  useEffect(() => {
    localStorage.setItem('Notas', JSON.stringify(notes))
  }, [notes])

  const eachNote = notes.map((noteMapped) => (
    <NoteList
      key={noteMapped.id}
      title={noteMapped.title}
      id={noteMapped.id}
      currentTask={currentTask}
      selected={noteMapped.selected}
      deleteNote={deleteNote}
      updateNote={updateNote}
    />
  ))
  return (
    <div className="main--app">
      <nav className="main--nav">
        <h1>Task List</h1>
      </nav>
      <div className="main--input">
        <input
          type="text"
          onChange={handleChange}
          name="value"
          value={note.value}
          onKeyPress={handle}
        />
        <FaPlus type="submit" onClick={addNote} className="buttons" />
      </div>
      <main className="main--notes">{eachNote}</main>
    </div>
  )
}
