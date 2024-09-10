import { useEffect, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { updateTask } from "../../store/board/board.actions"
import { shallowEqual, useSelector } from "react-redux"
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service"

export function TaskPreview({ onDragStart, taskId }) {
    const memoizedSelector = (storeState) => {
        const board = storeState.boardModule.board
        const group = board.groups.find(g => g.tasks.some(t => t.id === taskId))
        const task = group?.tasks.find(t => t.id === taskId)
        return { task, groupId: group?.id }
    }

    const { task, groupId } = useSelector(memoizedSelector, shallowEqual)
    const { boardId } = useParams()
    const totalCheckItems = task.checklists?.flatMap(checklist => checklist.checkItems).length || 0
    const checkedItems = task.checklists?.flatMap(checklist => checklist.checkItems).filter(checkItem => checkItem?.checked).length || 0
    const isCompleted = totalCheckItems > 0 && totalCheckItems === checkedItems
    const [datesContent, setDatesContent] = useState("")
    const [datesNotificationClass, setDatesNotificationClass] = useState("")
    const [completed, setCompleted] = useState(task.completed || false)
    const [noDueDate, setNoDueDate] = useState(false)
    const previousCompleted = useRef(task.completed || false)


    useEffect(() => {
        let startDate, dueDate
        setCompleted(task.completed || false)
        setNoDueDate(false)

        if (task.startDate && task.dueDate) {
            startDate = new Date(task.startDate)
            dueDate = new Date(task.dueDate + ' ' + task.dueTime)
            const startDateString = startDate.toLocaleString('en-US', { month: 'short', day: 'numeric' })
            const dueDateString = dueDate.toLocaleString('en-US', { month: 'short', day: 'numeric' })
            setDatesContent(`${startDateString} - ${dueDateString}`)
        } else if (task.startDate) {
            startDate = new Date(task.startDate)
            const now = new Date()
            const isFuture = startDate > now
            const startedString = isFuture ? "Starts: " : "Started: "
            const startDateString = startedString + startDate.toLocaleString('en-US', { month: 'short', day: 'numeric' })
            setDatesContent(startDateString)
            setNoDueDate(true)
        } else if (task.dueDate) {
            dueDate = new Date(task.dueDate + ' ' + task.dueTime)
            const dueDateString = dueDate.toLocaleString('en-US', { month: 'short', day: 'numeric' })
            setDatesContent(dueDateString)
        }

        setDatesNotificationClass("")
        if (task.completed) {
            setDatesNotificationClass("complete")
        } else if (dueDate) {
            const now = new Date()
            const timeDiff = dueDate - now.getTime()
            if (timeDiff < 0) {
                setDatesNotificationClass("overdue")
            } else if (timeDiff < 1000 * 60 * 60 * 24) {
                setDatesNotificationClass("due-soon")
            }
        }
    }, [task.startDate, task.dueDate, task.dueTime, task.completed])

    useEffect(() => {
        if (task.id && previousCompleted.current !== completed) {
            const newTask = { ...task, completed: completed }

            onUpdateTask(newTask)
            previousCompleted.current = completed
        }
    }, [completed])

    function toggleLabelCollapse(ev) {
        ev.stopPropagation()
        ev.preventDefault()
        const taskPreviews = document.querySelectorAll(".task-preview")
        taskPreviews.forEach(taskPreview => taskPreview.querySelector(".task-preview-labels").classList.toggle("collapsed"))
    }

    function handleDragStart(ev) {
        onDragStart(ev, task, groupId)
    }

    function onUpdateTask(newTask) {
        if (!newTask) return
        try {
            updateTask(boardId, groupId, newTask)
            showSuccessMsg(`Task updated`)
        }
        catch (err) {
            showErrorMsg('Cannot update task')
        }
    }

    function onCompletedChange(ev) {
        if (noDueDate) return
        ev.preventDefault()
        ev.stopPropagation()
        setCompleted(prev => !prev)
    }

    return (
        <div className="task-preview" onDragStart={handleDragStart}>
            <Link to={`/${boardId}/${task.id}`}>
                {task.cover?.url && <img className="task-preview-cover" src={task.cover?.url} alt="cover" />}
                <div className="task-preview-container">
                    <div className="task-preview-labels collapsed">
                        {task.labels?.map(label => <div key={label.id} className="task-preview-label" style={{ backgroundColor: label.color, color: label.textColor }} onClick={ev => toggleLabelCollapse(ev)}><div className="task-preview-label-title">{label.title}</div></div>)}
                    </div>
                    <p>{task.title}</p>
                    <section className={`task-preview-badges`}>
                        {(task.dueDate || task.startDate) &&
                            <button className={`task-preview-badge ${datesNotificationClass} btn ${noDueDate ? "no-due-date" : "has-due-date"}`} onClick={(ev) => onCompletedChange(ev)}>
                                {!!task?.completed && <span className="icon icon-hover icon-sm icon-checkbox-checked" />}
                                {!task?.completed && <span className="icon icon-hover icon-sm icon-checkbox-unchecked" />}
                                <span className="icon icon-no-hover icon-sm icon-clock" />
                                <span className="info">{datesContent}</span>
                            </button>
                        }
                        {task.description &&
                            <span className={`task-preview-badge`}>
                                <span className="icon icon-sm icon-description" />
                            </span>
                        }
                        {task.checklists?.length > 0 &&
                            <span className={`task-preview-badge ${isCompleted && "completed"}`}>
                                <span className="icon icon-sm icon-checkbox-checked" />
                                <span className="info">{checkedItems}/{totalCheckItems}</span>
                            </span>
                        }
                    </section>
                </div>
            </Link>
        </div>
    )
}
