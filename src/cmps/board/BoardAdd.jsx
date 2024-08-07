import { useEffect, useRef } from 'react'
import { useForm } from '../../customHooks/useForm'
import { boardService } from '../../services/board.service.local'
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'
import { addBoard } from '../../store/board/board.actions'
import { Modal } from '../general/Modal'
import { autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/react-dom'

export function BoardAdd({ isOpen, closeModal }) {
  const [boardForm, setBoardForm, handleChange, resetForm] = useForm(boardService.getEmptyBoard())
  const focusRef = useRef(null)
  const { refs, floatingStyles } = useFloating({
    placement: 'right-start', // Preferred initial placement
    middleware: [
      offset(({ placement }) => {
        // Different offsets based on placement
        if (placement.startsWith('right')) {
          return 200 // Horizontal offset
        } else if (placement.startsWith('bottom')) {
          return 100 // Vertical offset (for top or bottom placements)
        }
      }),
      flip({
        fallbackPlacements: ['top-start', 'bottom-start', 'right-start'], // Define fallback placements
      }),
      shift({ padding: 5 }) // Shift the modal if it overflows the viewport
    ],
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
    if (!boardForm.title) return false
    onSaveBoard()
    setBoardForm(boardService.getEmptyBoard())
  }

  async function onSaveBoard() {
    try {
      const savedBoard = await addBoard(boardForm)

      showSuccessMsg(`Board added (id: ${savedBoard._id})`)
      closeModal()
    } catch (err) {
      showErrorMsg('Cannot add board')
    }
  }

  function onClose(ev) {
    ev.preventDefault()
    ev.stopPropagation()
    closeModal()
  }

  const { title } = boardForm

  return (
    <div className='board-add board-modal' ref={refs.setReference}>
      <Modal isOpen={isOpen} closeModal={ev => onClose(ev)} focusRef={focusRef} refs={refs.setFloating} style={floatingStyles}>
        <form onSubmit={ev => onSubmitBoard(ev)} onKeyDown={ev => ev.key === 'Enter' && onSubmitBoard(ev)} noValidate>
          <header className='board-modal-header'>
            <h2 className='board-modal-title'>Create board</h2>
            <button className='btn icon-wrapper board-modal-close' onClick={ev => onClose(ev)}>
              <span className="icon icon-sm icon-close" />
            </button>
          </header>
          <section className='board-modal-content'>
            <label htmlFor="title">Board title</label>
            <input onChange={ev => handleChange(ev)} value={title} type="text" id="title" name="title" required ref={focusRef} />
            <label htmlFor="title" className='notification'>
              <span role="img" aria-label="wave">👋</span>
              <p>Board title is required</p>
            </label>
            <button className={`board-modal-create btn btn-color-bold blue ${!boardForm.title && 'disabled'}`}>Create</button>
          </section>
        </form>

      </Modal>
    </div >
  )
}

