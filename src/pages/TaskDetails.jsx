import { Modal } from "../cmps/general/Modal"
import { useNavigate, useParams } from "react-router"
import { useModal } from "../customHooks/useModal"
import { useEffect } from "react"
import { shallowEqual, useSelector } from "react-redux"
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
import { TaskDetailsChecklists } from "../cmps/task/TaskDetailsChecklists"

export function TaskDetails() {
    const { boardId, taskId } = useParams()
    const { isOpen, openModal, closeModal } = useModal()
    const navigate = useNavigate()

    const memoizedSelector = (storeState) => {
        const board = storeState.boardModule.board
        const group = board.groups.find(g => g.tasks.some(t => t.id === taskId))
        const task = group?.tasks.find(t => t.id === taskId)
        return { currentTask: task, groupId: group?.id, groupTitle: group?.title }
    }

    const { currentTask, groupId, groupTitle } = useSelector(memoizedSelector, shallowEqual)
    console.log(currentTask, "from taskDetails")

    useEffect(() => {
        if (!taskId) return
        openModal()
    }, [taskId])


    function onClose(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        closeModal()
        navigate("..")
    }

    function onUpdateTaskTitle(newTitle) {
        if (!newTitle) return
        try {
            const newTask = { ...currentTask, title: newTitle }
            updateTask(boardId, groupId, newTask)
            showSuccessMsg(`Task title updated`)
        } catch (err) {
            showErrorMsg('Cannot update task title')
        }
    }

    function onUpdateTask(newTask){
        if(!newTask) return
        try{
            updateTask(boardId, groupId, newTask)
            console.log("task updated")
            showSuccessMsg(`Task updated`)
        }
        catch(err){
            showErrorMsg('Cannot update task')
        }
    }

    if (!currentTask) return null
    return (
        <Modal isOpen={isOpen} closeModal={ev => onClose(ev)} cmpClassName='task-details'>

            <button className='btn icon-wrapper task-details-close' onClick={ev => onClose(ev)}>
                <span className="icon icon-lg icon-close" />
            </button>
            <TaskDetailsCover task={currentTask} />

            <article className='task-details-content'>
                <TaskDetailsHeader task={currentTask} groupTitle={groupTitle} onUpdateTaskTitle={onUpdateTaskTitle} />
                <section className='task-details-main'>
                    <section className="task-details-data">
                        <TaskDetailsLabels task={currentTask} />
                        <TaskDetailsMembers task={currentTask} />
                        <TaskDetailsNotifications task={currentTask} />
                    </section>
                    <TaskDetailsChecklists task={currentTask} />
                    <TaskDetailsDescription task={currentTask} onUpdateTask={onUpdateTask} />
                    <TaskDetailsAttachents task={currentTask} />
                    <TaskDetailsActivities task={currentTask} />
                </section>
                <TaskDetailsSidebar task={currentTask} />
            </article>
        </Modal >
    )
}