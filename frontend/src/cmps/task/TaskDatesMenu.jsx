import { shallowEqual, useSelector } from 'react-redux'
import { useForm } from '../../customHooks/useForm'
import { useParams } from 'react-router'
import { useEffect } from 'react'
import { updateTask } from '../../store/board/board.actions'
import { DatePicker } from '../general/DatePicker'

export function TaskDatesMenu({ onClose }) {
	const { taskId } = useParams()
	const memoizedSelector = (storeState) => {
		const board = storeState.boardModule.board
		const group = board.groups.find(g => g.tasks.some(t => t.id === taskId))
		const task = group?.tasks.find(t => t.id === taskId)
		return { board, currentTask: task, groupId: group?.id }
	}

	const { board, currentTask, groupId } = useSelector(memoizedSelector, shallowEqual)

	const { _id: boardId } = board
	const { startDate, dueDate } = currentTask

	const initialDatesForm = { startDate, dueDate }
	const [datesForm, setDateForm, handleChange, resetForm] = useForm(initialDatesForm)

	useEffect(() => {
		resetForm()
	}, [taskId])

	useEffect(() => {
		if (JSON.stringify(datesForm) !== JSON.stringify(initialDatesForm)) {
			updateTask(boardId, groupId, { ...currentTask, startDate: datesForm.startDate, dueDate: datesForm.dueDate })
		}
	}, [datesForm])

	function handleClose(ev = null) {
		if (ev) {
			ev.preventDefault()
			ev.stopPropagation()
		}
		resetForm()
		onClose()
	}

	function handleDatesChange({ startDate, dueDate }) {
		setDateForm({ startDate, dueDate })
	}

	return (

		<form onSubmit={ev => ev.preventDefault()} className='task-dates-menu'>
			<header className='popover-small-header'>
				<h2 className='popover-small-title'>Dates</h2>
				<button className='btn icon-wrapper popover-small-close' onClick={ev => handleClose(ev)}>
					<span className="icon icon-sm icon-close" />
				</button>
			</header>
			<section className='task-label-menu-content'>
				<DatePicker
					initialStartDate={startDate}
					initialDueDate={dueDate}
					onDatesChange={handleDatesChange} 
				/>
			</section>
		</form>
	)
}