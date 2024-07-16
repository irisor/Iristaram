import { useState, useRef, useEffect } from 'react';

export function EditableTitle({ initialTitle, onUpdateTitle, tag='h2' }) {
  const [title, setTitle] = useState(initialTitle)
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef()
  const TagComponent = tag


  useEffect(() => {
    setTitle(initialTitle)
  }, [initialTitle])

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus()
      inputRef.current.select()
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
      { isEditing ? (
        <textarea className='editable-title-input'
          onKeyDown={ev => ev.key === 'Enter' && handleInputBlur(ev)}
          type="text"
          value={title}
          onChange={(ev) => handleInputChange(ev)}
          onBlur={ev => handleInputBlur(ev)}
          ref={inputRef}
        />
      ) : (
        <TagComponent className='editable-title-fixed' onClick={ev => handleTitleClick(ev)}>{title}</TagComponent>
      )}
    </div>
  );
}
