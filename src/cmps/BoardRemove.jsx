import { useEffect, useRef, useState } from 'react'
import { useForm } from '../customHooks/useForm'
import { boardService } from '../services/board.service.local'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { removeBoard } from '../store/board.actions'
import { Modal } from './Modal'
import { AiOutlineClose } from 'react-icons/ai'
import { IconContext } from 'react-icons'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { autoPlacement, autoUpdate, useFloating } from '@floating-ui/react-dom'

export function BoardRemove({ isOpen, closeModal, clickRef }) {
  const [boardForm, setBoardForm, handleChange, resetForm] = useForm(boardService.getEmptyBoard())
  const [position, setPosition] = useState(calculatePosition())
  const focusRef = useRef(null)
  const board = useSelector(storeState => storeState.boardModule.board)
  const navigate = useNavigate()
  const {refs, floatingStyles} = useFloating({placement: 'left', middleware: [autoPlacement()], 
    whileElementsMounted(referenceEl, floatingEl, update) {
      const cleanup = autoUpdate(referenceEl, floatingEl, update, {
        ancestorScroll: false,
      });
      return cleanup;
    },
  });

  useEffect(() => {
    resetForm()
  }, [isOpen])

  useEffect(() => {
    setPosition(calculatePosition())
  }, [clickRef?.current])

  function onSubmitBoard(ev) {
    ev.preventDefault()
    ev.stopPropagation()
    onRemoveBoard()
    setBoardForm(boardService.getEmptyBoard())
  }

  function calculatePosition() {
    if (!clickRef?.current) return

    // The modal is positioned right to the "create new board" element
    const rect = clickRef.current.getBoundingClientRect()
    const offset = 8 // px
    const insetInlineStart = rect?.right + offset
    const insetBlockStart = rect?.y

    return { insetInlineStart, insetBlockStart }
  }

  async function onRemoveBoard() {
    try {
      await removeBoard(board._id)
      closeModal()
      navigate('/boards/', { replace: true })
      showSuccessMsg('Board removed')
    } catch (err) {
      showErrorMsg('Cannot remove board')
    }
  }

  function onClose(ev) {
    ev.preventDefault()
    ev.stopPropagation()
    closeModal()
  }

  return (
    <div className='board-remove board-modal' ref={refs.setReference}>
      <Modal isOpen={isOpen} closeModal={ev => onClose(ev)} position={position} focusRef={focusRef} refs={refs.setFloating} style={floatingStyles}>
        <form onSubmit={ev => onSubmitBoard(ev)} onKeyDown={ev => ev.key === 'Enter' && onSubmitBoard(ev)} noValidate>
          <header className='board-modal-header'>
            <h2 className='board-modal-title'>Remove board?</h2>
            <button className='btn icon board-modal-close' onClick={ev => onClose(ev)}>
              <IconContext.Provider value={{ color: 'inherit' }}>
                <AiOutlineClose />
              </IconContext.Provider>
            </button>
          </header>
          <section className='board-modal-content'>
            <button className={`board-modal-create btn btn-color-bold red`}>Remove</button>
          </section>
        </form>

      </Modal>
    </div >
  )
}

