import { useEffect, useRef } from 'react'
import { useForm } from '../../customHooks/useForm'
import { boardService } from '../../services/board.service.local'
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'
import { removeBoard } from '../../store/board.actions'
import { Modal } from '../general/Modal'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { autoPlacement, autoUpdate, useFloating } from '@floating-ui/react-dom'

export function BoardRemove({ isOpen, closeModal }) {
  const [boardForm, setBoardForm, handleChange, resetForm] = useForm(boardService.getEmptyBoard())
  const focusRef = useRef(null)
  const board = useSelector(storeState => storeState.boardModule.board)
  const navigate = useNavigate()
  const { refs, floatingStyles } = useFloating({
    placement: 'left', middleware: [autoPlacement()],
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

  function onSubmitBoard(ev) {
    ev.preventDefault()
    ev.stopPropagation()
    onRemoveBoard()
    setBoardForm(boardService.getEmptyBoard())
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
      <Modal isOpen={isOpen} closeModal={ev => onClose(ev)} focusRef={focusRef} refs={refs.setFloating} style={floatingStyles}>
        <form onSubmit={ev => onSubmitBoard(ev)} onKeyDown={ev => ev.key === 'Enter' && onSubmitBoard(ev)} noValidate>
          <header className='board-modal-header'>
            <h2 className='board-modal-title'>Remove board?</h2>
            <button className='btn icon-wrapper board-modal-close' onClick={ev => onClose(ev)}>
              <span className="icon icon-sm icon-close" />
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

