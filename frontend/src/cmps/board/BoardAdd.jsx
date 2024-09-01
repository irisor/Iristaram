import { useEffect, useRef } from 'react'
import { useForm } from '../../customHooks/useForm'
import { boardService } from '../../services/board/'
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'
import { addBoard } from '../../store/board/board.actions'

export function BoardAdd({ onClose, focusInput, setFocusInput }) {
  const [boardForm, setBoardForm, handleChange, resetForm] = useForm(boardService.getEmptyBoard())
  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
      setFocusInput(false)
    }
  }, [focusInput, setFocusInput])
  
  useEffect(() => {
    resetForm()
  }, [])

  function onSubmitBoard(ev) {
    ev.preventDefault()
    ev.stopPropagation()
    if (!boardForm.title) return false
    onSaveBoard()
    setBoardForm(boardService.getEmptyBoard())
  }

  async function onSaveBoard() {
    try {
      const savedBoard = await addBoard(boardForm)

      showSuccessMsg(`Board added (id: ${savedBoard._id})`)
      onClose()
    } catch (err) {
      showErrorMsg('Cannot add board')
    }
  }

  function handleClose(ev) {
    ev.preventDefault()
    ev.stopPropagation()
    onClose()
  }

  const { title } = boardForm

  return (
    <div className='board-add popover-small'>
      <form onSubmit={ev => onSubmitBoard(ev)} onKeyDown={ev => ev.key === 'Enter' && onSubmitBoard(ev)} noValidate>
        <header className='popover-small-header'>
          <h2 className='popover-small-title'>Create board</h2>
          <button className='btn icon-wrapper popover-small-close' onClick={ev => handleClose(ev)}>
            <span className="icon icon-sm icon-close" />
          </button>
        </header>
        <section className='popover-small-content'>
          <label htmlFor="title">Board title</label>
          <input onChange={ev => handleChange(ev)} value={title} type="text" id="title" name="title" required ref={inputRef} />
          <label htmlFor="title" className='notification'>
            <span role="img" aria-label="wave">👋</span>
            <p>Board title is required</p>
          </label>
          <button className={`popover-small-create btn btn-color-bold blue ${!boardForm.title && 'disabled'}`}>Create</button>
        </section>
      </form>
    </div >
  )
}

