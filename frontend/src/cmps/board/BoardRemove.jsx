import { useEffect } from 'react'
import { useForm } from '../../customHooks/useForm'
import { boardService } from '../../services/board.service.local'
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'
import { removeBoard } from '../../store/board/board.actions'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

export function BoardRemove({ onClose }) {
  const [boardForm, setBoardForm, handleChange, resetForm] = useForm(boardService.getEmptyBoard())
  const board = useSelector(storeState => storeState.boardModule.board)
  const navigate = useNavigate()


  useEffect(() => {
    resetForm()
  }, [])

  function onSubmitBoard(ev) {
    ev.preventDefault()
    ev.stopPropagation()
    setBoardForm(boardService.getEmptyBoard())
    onRemoveBoard()
  }

  async function onRemoveBoard() {
    try {
      await removeBoard(board._id)
      navigate('/boards/', { replace: true })
      onClose()
      showSuccessMsg('Board removed')
    } catch (err) {
      showErrorMsg('Cannot remove board')
    }
  }

  function handleClose(ev) {
    ev.preventDefault()
    ev.stopPropagation()
    onClose()
  }

  return (
    <div className='board-remove popover-small'>
        <form onSubmit={ev => onSubmitBoard(ev)} onKeyDown={ev => ev.key === 'Enter' && onSubmitBoard(ev)} noValidate>
          <header className='popover-small-header'>
            <h2 className='popover-small-title'>Remove board?</h2>
            <button className='btn icon-wrapper popover-small-close' onClick={ev => handleClose(ev)}>
              <span className="icon icon-sm icon-close" />
            </button>
          </header>
          <section className='popover-small-content'>
            <button className={`popover-small-create btn btn-color-bold red`}>Remove</button>
          </section>
        </form>
    </div >
  )
}

