import { useEffect, useRef } from 'react'
import { useForm } from '../../customHooks/useForm'
import { useParams } from 'react-router';
import { shallowEqual, useSelector } from 'react-redux';
import { updateTask } from '../../store/board/board.actions';
import { utilService } from '../../services/util.service';
import { setOpenCreateItem } from '../../store/general/general.actions';

export function TaskDetailsAddChecklist({ onClose, focusInput, setFocusInput }) {
  const [checklistForm, seChecklistForm, handleChange, resetForm] = useForm({ title: 'Checklist' })
  const { taskId } = useParams();
  const memoizedSelector = (storeState) => {
    const board = storeState.boardModule.board
    const group = board.groups.find(g => g.tasks.some(t => t.id === taskId))
    const task = group?.tasks.find(t => t.id === taskId)
    return { boardId: board._id, currentTask: task, groupId: group?.id }
  }

  const { boardId, currentTask, groupId } = useSelector(memoizedSelector, shallowEqual)
  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
      setFocusInput(false)
    }
  }, [focusInput, setFocusInput])

  function onSubmit(ev) {
    ev.preventDefault()
    ev.stopPropagation()
    if (checklistForm.title === '') return
    const newChecklist = {
      id: utilService.makeId(),
      title: checklistForm.title,
      checkItems: [],
      checked: false
    }
    const newTask = {
      ...currentTask, checklists: currentTask.checklists ? [...currentTask.checklists, newChecklist] : [newChecklist]
    }
    updateTask(boardId, groupId, { ...newTask })
    setOpenCreateItem(newChecklist.id)
    handleClose()
  }

  function handleClose(ev = null) {
    if (ev) {
      ev.preventDefault()
      ev.stopPropagation()
    }
    resetForm()
    onClose()
  }

  return (
    <div className='task-details-add-checklist popover-small'>
      <form onSubmit={ev => onSubmit(ev)} onKeyDown={ev => ev.key === 'Enter' && onSubmit(ev)} noValidate>
        <header className='popover-small-header'>
          <h2 className='popover-small-title'>Add Checklist</h2>
          <button className='btn icon-wrapper popover-small-close' onClick={ev => handleClose(ev)}>
            <span className="icon icon-sm icon-close" />
          </button>
        </header>
        <section className='popover-small-content'>
          <input
            ref={inputRef}
            className='popover-small-input'
            value={checklistForm.title}
            type="text"
            name="title"
            placeholder="Title"
            onChange={handleChange}
          />
          <button className={`popover-small-create btn btn-color-bold blue`} onClick={ev => onSubmit(ev)}>Add</button>
        </section>
      </form>
    </div >
  )
}

