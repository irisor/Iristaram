import { useEffect, useState } from 'react'
import { useForm } from '../customHooks/useForm'
import { boardService } from '../services/board.service.local'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { addBoard } from '../store/board.actions'
import { Modal } from './Modal'
import { AiOutlineClose } from 'react-icons/ai'
import { IconContext } from 'react-icons'

export function BoardAdd({ isOpen, closeModal, clickRef }) {
  const [board, handleChange] = useForm(boardService.getEmptyBoard())
  const [position, setPosition] = useState(calculatePosition())

  function onSubmitBoard(ev) {
    ev.preventDefault()
    onSaveBoard(board)
  }

  useEffect(() => {
    setPosition(calculatePosition())
  }, [clickRef.current])

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
      handleChange({ target: { value: '' } })
    } catch (err) {
      showErrorMsg('Cannot add board')
    }
  }

  const { title } = board

  return (
    <div>
      <Modal isOpen={isOpen} closeModal={closeModal} position={position}>
        <h2 className='create-board-title'>Create board</h2>
        <button className='btn icon' onClick={closeModal}>
          <IconContext.Provider value={{ color: 'inherit' }}>
            <AiOutlineClose />
          </IconContext.Provider>
        </button>

        <form onSubmit={ev => onSubmitBoard(ev)}>
          <label htmlFor="title">Board title</label>
          <input onChange={ev => handleChange(ev)} value={title} type="text" id="title" name="title" required />
          <button className={`btn ${!board.title && 'btn-disabled'}`}>Create</button>
        </form>

      </Modal>
    </div>
  )
}

