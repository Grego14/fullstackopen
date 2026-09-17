const Note = ({ note, toggleImportance }) => {
 const label = note.important
    ? 'make not important' : 'make important'

  return <li>
    {note.content}
    <button 
      style={{ marginLeft: '1rem' }} 
      type='button' 
      onClick={toggleImportance}
    >
      {label}
    </button>
  </li>
}

export default Note
