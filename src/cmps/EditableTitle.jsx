import { useState, useRef, useEffect } from 'react';
import { useClickOutside } from '../customHooks/useClickOutside';
import { useKeyDown } from '../customHooks/useKeyDown';

export function EditableTitle({ initialTitle, onUpdateTitle, tag='h2' }) {
  const [title, setTitle] = useState(initialTitle)
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef()
  const TagComponent = tag;


  useEffect(() => {
    console.log("OnuseEffect",isEditing, inputRef)
    if (isEditing) {
      inputRef.current.focus()
      inputRef.current.select()
    }
    // else{
    //   if(inputRef.current){
    //     inputRef.current.blur()

    //   }
    // }
  }, [isEditing])

  useClickOutside((event) => handleInputBlur(event), inputRef);
  // useKeyDown(() => handleInputBlur(), ['Escape', 'Enter']);

  function handleTitleClick(ev) {
    ev.stopPropagation()
    ev.preventDefault()
    setIsEditing(true)
  }

  function handleInputChange(ev) {
    setTitle(ev.target.value)
  }

  function handleInputBlur(ev = null) {
    console.log("onHandleInputBlur", ev);
    ev?.stopPropagation()
    ev?.preventDefault()
    setIsEditing(false)
    onUpdateTitle(title)
  }

  return (
    <div className='editable-title'>
      { isEditing ? (
        <textarea className='editable-title-input'
          onKeyDown={ev => ev.key === 'Enter' || ev.key ==='Escape' && handleInputBlur(ev)}
          type="text"
          value={title}
          onChange={(ev) => handleInputChange(ev)}
          // onBlur={ev => handleInputBlur(ev)}
          ref={inputRef}
        />
      ) : (
        <TagComponent className='editable-title-fixed' onClick={ev => handleTitleClick(ev)}>{title}</TagComponent>
      )}
    </div>
  );
}
