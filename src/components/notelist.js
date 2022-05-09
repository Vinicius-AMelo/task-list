import React from 'react'
import { FaTrashAlt, FaSync } from 'react-icons/fa'

// eslint-disable-next-line object-curly-newline
export default function NoteList({
  title,
  currentTask,
  id,
  selected,
  deleteNote,
  updateNote,
}) {
  return (
    <div className="main--notes">
      <div className={selected ? 'notes selected' : 'notes'}>
        <div role="none" onClick={() => currentTask(id)} className="note">
          <p>{title}</p>
        </div>
        <div className="note--icons buttons">
          <FaTrashAlt onClick={() => deleteNote(id)} />
          <FaSync onClick={() => updateNote(id)} />
        </div>
      </div>
    </div>
  )
}
