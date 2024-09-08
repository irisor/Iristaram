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
	const { startDate, dueDate, dueTime, reminder } = currentTask

	const initialDatesForm = { startDate, dueDate, dueTime, reminder }
	const [datesForm, setDatesForm, handleChange, resetForm] = useForm(initialDatesForm)

	useEffect(() => {
		resetForm()
	}, [taskId])

	useEffect(() => {
		if (JSON.stringify(datesForm) !== JSON.stringify(initialDatesForm)) {
			// console.log("#2", startDate, dueDate, dueTime, reminder)
			updateTask(boardId, groupId, { ...currentTask, ...datesForm })
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

	function handleDatesChange({ startDate, dueDate, dueTime, reminder }) {
		setDatesForm({ startDate, dueDate, dueTime, reminder })
		// console.log("#1", startDate, dueDate, dueTime, reminder)
	}

	return (

		<form onSubmit={ev => ev.preventDefault()} className='task-dates-menu task-sidebar-menu'>
			<header className='popover-small-header'>
				<h2 className='popover-small-title'>Dates</h2>
				<button className='btn icon-wrapper popover-small-close' onClick={ev => handleClose(ev)}>
					<span className="icon icon-sm icon-close" />
				</button>
			</header>
			<section className='task-dates-menu-content task-sidebar-menu-content'>
				{/* {console.log("#3", startDate, dueDate, dueTime, reminder)} */}
				<DatePicker 
					initialStartDate={startDate}
					initialDueDate={dueDate}
					initialDueTime={dueTime}
					initialReminder={reminder}
					onDatesChange={handleDatesChange}
					onClose={onClose}
					onReset={() => {
						resetForm();
					}}
				/>
			</section>
		</form>
	)
}