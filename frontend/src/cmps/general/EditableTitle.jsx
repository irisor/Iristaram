import { useState, useRef, useEffect } from 'react'
import { useClickOutside } from '../../customHooks/useClickOutside'
import { useKeyDown } from '../../customHooks/useKeyDown'
import { useResizeInput } from '../../customHooks/useResizeInput'

export function EditableTitle({ initialTitle, onUpdateTitle, tag='h2' }) {
  const [title, setTitle] = useState(initialTitle)
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef()
  const TagComponent = tag

  useKeyDown(() => handleInputBlur(), isEditing, ['Escape', 'Enter'])
  const { resizeInput } = useResizeInput(inputRef)
  

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus()
      inputRef.current.select()
      resizeInput()
    }
  }, [isEditing])

  useClickOutside((event) => handleInputBlur(event), inputRef)
  useKeyDown(() => handleInputBlur(), isEditing, ['Escape', 'Enter'])

  function handleTitleClick(ev) {
    ev.stopPropagation()
    ev.preventDefault()
    setIsEditing(true)
  }

  function handleInputChange(ev) {
    setTitle(ev.target.value)
  }

  function handleInputBlur() {
    setIsEditing(false)
    onUpdateTitle(title)
  }

  return (
    <form className='editable-title'>
      { isEditing ? (
        <textarea className='editable-title-input'
          type="text"
          value={title}
          onChange={(ev) => handleInputChange(ev)}
          ref={inputRef}
          onInput={resizeInput}
          rows="1"
        />
      ) : (
        <TagComponent className='editable-title-fixed' onClick={ev => handleTitleClick(ev)}>{title}</TagComponent>
      )}
    </form>
  )
}
