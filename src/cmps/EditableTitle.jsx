import { useState, useRef, useEffect } from 'react';

export function EditableTitle({ initialTitle, onUpdateTitle }) {
  const [title, setTitle] = useState(initialTitle)
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef()

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus()
    }
  }, [isEditing])

  function handleTitleClick(ev) {
    ev.stopPropagation()
    ev.preventDefault()
    setIsEditing(true)
  }

  function handleInputChange(ev) {
    setTitle(ev.target.value)
  }

  function handleInputBlur(ev) {
    ev.stopPropagation()
    ev.preventDefault()
    setIsEditing(false)
    onUpdateTitle(title)
  }

  return (
    <div className='editable-title'>
      { false || isEditing ? (
        <textarea className='editable-title__input'
          onKeyDown={ev => ev.key === 'Enter' && handleInputBlur(ev)}
          type="text"
          value={title}
          onChange={(ev) => handleInputChange(ev)}
          onBlur={ev => handleInputBlur(ev)}
          ref={inputRef}
        />
      ) : (
        <h2 className='editable-title__fixed' onClick={ev => handleTitleClick(ev)}>{title}</h2>
      )}
    </div>
  );
}
