import { Popover } from "antd"
import { useEffect, useState } from "react"
import { TaskDatesMenu } from "./TaskDatesMenu"
import { useMultiPopover } from "../../customHooks/useMultiPopover"

export function TaskDetailsDates({ task, onUpdateTask }) {

	const { openPopover, closePopover, isPopoverOpen } = useMultiPopover()
	const [datesTitle, setDatesTitle] = useState("dueDate")
	const [datesContent, setDatesContent] = useState("")
	const [datesNotification, setDatesNotification] = useState("")
	const [datesNotificationClass, setDatesNotificationClass] = useState("")
	const [completed, setCompleted] = useState(task.completed || false)

	useEffect(() => {
		let startDate, dueDate

		if (completed) return

		if (task.startDate && task.dueDate) {
			startDate = new Date(task.startDate)
			dueDate = new Date(task.dueDate + ' ' + task.dueTime)
			const startDateString = startDate.toLocaleString('en-GB', { month: 'short', day: 'numeric' })
			const dueDateString = dueDate.toLocaleString('en-GB', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
			setDatesTitle("Dates")
			setDatesContent(`${startDateString} - ${dueDateString}`)
		} else if (task.startDate) {
			startDate = new Date(task.startDate)
			const startDateString = startDate.toLocaleString('en-GB', { month: 'short', day: 'numeric' })
			setDatesTitle("Start date")
			setDatesContent(startDateString)
		} else if (task.dueDate) {
			dueDate = new Date(task.dueDate + ' ' + task.dueTime)
			const dueDateString = dueDate.toLocaleString('en-GB', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
			setDatesTitle("Due date")
			setDatesContent(dueDateString)
		}
		if (dueDate) {
			const now = new Date()
			const timeDiff = dueDate - now.getTime()
			if (timeDiff < 0) {
				setDatesNotification("Overdue")
				setDatesNotificationClass("overdue")
			} else if (timeDiff < 1000 * 60 * 60 * 24) {
				setDatesNotification("Due soon")
				setDatesNotificationClass("due-soon")
			}
		}
	}, [task.startDate, task.dueDate, task.dueTime, completed])

	useEffect(() => {
		if (task.id) {
			onUpdateTask({ ...task, completed: completed })
		}
		if (completed) {
			setDatesNotification("Complete")
			setDatesNotificationClass("complete")
		}
	}, [completed])

	return (
		<>
			{(task.dueDate || task.startDate) &&
				<section className="task-details-dates task-details-data-item">
					<h3 className="task-details-dates-title task-details-data-item-title">{datesTitle}</h3>
					<section className="task-details-dates-btn task-details-data-item-content">
						<input type="checkbox" className="task-details-dates-checkbox" checked={completed} onChange={() => setCompleted(prev => !prev)} />
						<Popover content={props => TaskDatesMenu({ ...props, onClose: closePopover })}
							open={isPopoverOpen(`popover-dates${task.id}`)}
							onOpenChange={(open) => (open ? openPopover(`popover-dates${task.id}`) : closePopover())}
							placement="center" trigger={"click"} arrow={false}>
							<button className="btn task-details-dates-content">
								<span>{datesContent}</span>
								<span className={`task-details-dates-notification ${datesNotificationClass}`}>{datesNotification}</span>
								<span className="icon icon-sm icon-down" />
							</button>
						</Popover>
					</section>
				</section>
			}
		</>
	)
}