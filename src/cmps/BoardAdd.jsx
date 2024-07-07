import { useEffect, useRef, useState } from 'react'
import { useForm } from '../customHooks/useForm'
import { boardService } from '../services/board.service.local'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { addBoard } from '../store/board.actions'
import { Modal } from './Modal'
import { AiOutlineClose } from 'react-icons/ai'
import { IconContext } from 'react-icons'

export function BoardAdd({ isOpen, closeModal, clickRef }) {
  const [board, setBoard, handleChange, resetForm] = useForm(boardService.getEmptyBoard())
  const [position, setPosition] = useState(calculatePosition())
  const focusRef = useRef(null)

  useEffect(() => {
    resetForm()
  }, [isOpen])

  useEffect(() => {
    setPosition(calculatePosition())
  }, [clickRef.current])

  function onSubmitBoard(ev) {
    ev.preventDefault()
    ev.stopPropagation()
    if (!board.title) return false
    onSaveBoard(board)
    setBoard(boardService.getEmptyBoard())
  }

  function calculatePosition() {
    if (!clickRef.current) return

    // The modal is positioned right to the "create new board" element
    const rect = clickRef.current.getBoundingClientRect()
    const offset = 8 // px
    const insetInlineStart = rect?.right + offset
    const insetBlockStart = rect?.y

    return { insetInlineStart, insetBlockStart }
  }

  async function onSaveBoard() {
    try {
      const savedBoard = await addBoard(board)

      showSuccessMsg(`Board added (id: ${savedBoard._id})`)
      closeModal()
      resetForm()
    } catch (err) {
      showErrorMsg('Cannot add board')
    }
  }

  function onClose(ev) {
    ev.preventDefault()
    ev.stopPropagation()
    closeModal()
  }

  const { title } = board

  return (
    <div className='board-add'>
      <Modal isOpen={isOpen} closeModal={ev => onClose(ev)} position={position} focusRef={focusRef}>
        <form onSubmit={ev => onSubmitBoard(ev)} onKeyDown={ev => ev.key === 'Enter' && onSubmitBoard(ev)} noValidate>
          <header className='board-add-header'>
            <h2 className='board-add-title'>Create board</h2>
            <button className='btn icon board-add-close' onClick={ev => onClose(ev)}>
              <IconContext.Provider value={{ color: 'inherit' }}>
                <AiOutlineClose />
              </IconContext.Provider>
            </button>
          </header>
          <section className='board-add-content'>
            <label htmlFor="title">Board title</label>
            <input onChange={ev => handleChange(ev)} value={title} type="text" id="title" name="title" required ref={focusRef} />
            <label htmlFor="title" className='notification'>
              <span role="img" aria-label="wave">👋</span>
              <p>Board title is required</p>
            </label>
            <button className={`board-add-create btn btn-blue ${!board.title && 'disabled'}`}>Create</button>
          </section>
        </form>

      </Modal>
    </div >
  )
}

