import { Modal } from "../cmps/general/Modal"
import { useNavigate, useParams } from "react-router"
import { useModal } from "../customHooks/useModal"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { updateTask } from "../store/board/board.actions"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { TaskDetailsCover } from "../cmps/task/TaskDetailsCover"
import { TaskDetailsHeader } from "../cmps/task/TaskDetailsHeader"
import { TaskDetailsMembers } from "../cmps/task/TaskDetailsMembers"
import { TaskDetailsNotifications } from "../cmps/task/TaskDetailsNotifications"
import { TaskDetailsDescription } from "../cmps/task/TaskDetailsDescription"
import { TaskDetailsAttachents } from "../cmps/task/TaskDetailsAttachents"
import { TaskDetailsActivities } from "../cmps/task/TaskDetailsActivities"
import { TaskDetailsSidebar } from "../cmps/task/TaskDetailsSidebar"
import { TaskDetailsLabels } from "../cmps/task/TaskDetailsLabels"

export function TaskDetails() {
    const { boardId, taskId } = useParams()
    const { isOpen, openModal, closeModal } = useModal()
    const [task, setTask] = useState({})
    const navigate = useNavigate()

    const [currentTask, groupId, groupTitle, taskLabels] = useSelector((storeState) => {
        const board = storeState.boardModule.board
        const group = board.groups.find(group => group.tasks.some(t => t.id === taskId))
        const task = group?.tasks.find(task => task.id === taskId)
        return [task, group?.id, group?.title, task.labels]
    });

    useEffect(() => {
        if (!taskId) return
        openModal();
        loadTask();
    }, [taskId]);

    function loadTask() {
        setTask(currentTask);
    }

    function onClose(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        closeModal()
        navigate("..")
    }

    function onUpdateTaskTitle(newTitle) {
        if (!newTitle) return
        try {
            const newTask = { ...task, title: newTitle }
            updateTask(boardId, groupId, newTask)
            showSuccessMsg(`Task title updated`)
        } catch (err) {
            showErrorMsg('Cannot update task title')
        }
    }

    if (!task) return null
    return (
        <Modal isOpen={isOpen} closeModal={ev => onClose(ev)} cmpClassName='task-details'>

            <button className='btn icon-wrapper task-details-close' onClick={ev => onClose(ev)}>
                <span className="icon icon-lg icon-close" />
            </button>
           <TaskDetailsCover task={task} />

            <article className='task-details-content'>
                <TaskDetailsHeader task={task} groupTitle={groupTitle} onUpdateTaskTitle={onUpdateTaskTitle} />
                <section className='task-details-main'>
                    <section className="task-details-data">
                        <TaskDetailsLabels task={task} />
                        <TaskDetailsMembers task={task} />
                        <TaskDetailsNotifications task={task} />
                    </section>
                    <TaskDetailsDescription task={task} />
                    <TaskDetailsAttachents task={task} />
                    <TaskDetailsActivities task={task} />
                </section>
                <TaskDetailsSidebar task={task} />
            </article>
        </Modal >
    )
}