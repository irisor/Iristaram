import { Modal } from "../cmps/Modal"
import { useNavigate, useParams } from "react-router"
import { useModal } from "../customHooks/useModal"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { EditableTitle } from "../cmps/EditableTitle"
import { updateTask } from "../store/board.actions"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { CreateItem } from "../cmps/CreateItem"

export function TaskDetails() {
    const { boardId, taskId } = useParams()
    const { isOpen, openModal, closeModal } = useModal()
    const [task, setTask] = useState({})
    const navigate = useNavigate()

    const [currentTask, groupId, groupTitle] = useSelector((storeState) => {
        const board = storeState.boardModule.board;
        const group = board.groups.find(group => group.tasks.some(t => t.id === taskId));
        const task = group?.tasks.find(task => task.id === taskId);
        return [task, group?.id, group?.title];
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
            <article className='task-details-content'>
                <section className='task-details-header'>
                    <div className="task-details-card-icon icon icon-lg icon-card"></div>
                    <EditableTitle className="task-details-title" initialTitle={task.title} onUpdateTitle={title => onUpdateTaskTitle(title)} />
                    <div className="task-details-in-list">In list <a href="#">{groupTitle}</a></div>
                </section>
                <section className='task-details-main'>
                    <section className="task-details-data">
                        <section className="task-details-members task-details-data-item">
                            <h3 className="task-details-members task-details-data-item-title">Members</h3>
                            <section className="task-details-member-list task-details-data-item-content">
                                {task.memberIds?.map(member =>
                                    <button className="btn task-details-member" key={member}>
                                        <img className="avatar" src="../../src/assets/img/member.png" alt="avatar" />
                                    </button>
                                )}
                                <button className="btn task-details-add-member">
                                    <span className="icon icon-sm icon-add"></span>
                                </button>
                            </section>
                        </section>
                        <section className="task-details-notifications task-details-data-item">
                            <h3 className="task-details-notifications-title task-details-data-item-title">Notifications</h3>
                            <button className="btn task-details-notifications-btn task-details-data-item-content">
                                <span className="icon icon-sm icon-subscribe"></span>
                                <p>Watch</p>
                            </button>
                        </section>
                    </section>
                    <section className="task-details-description">
                        <section className="task-details-description-header">
                            <span className="icon icon-lg icon-description" />
                            <h3>Description</h3>
                            <button className="btn">Edit</button>
                        </section>
                        <p>{task.description}</p>
                    </section>
                    <section className="task-details-activity">
                        <section className="task-details-activity-header">
                            <span className="icon icon-lg icon-activity"></span>
                            <h3>Activity</h3>
                            <button className="btn">Hide Details</button>
                        </section>
                        <section className="task-details-activity-list">
                            <CreateItem />
                            <article className="task-details-activity-item">
                                <span className="member"></span>
                                <div className="task-details-activity-item-desc">some activity</div>
                                <div className="task-details-activity-item-time">Jul 14, 2024, 9:33 PM</div>
                            </article>
                        </section>
                    </section>
                </section>
                <section className="task-details-sidebar">
                    <section className="task-details-sidebar-module">
                        <h3 className="task-details-sidebar-module-title">Add to card</h3>
                        <section className="task-details-sidebar-module-list">
                            <button className="btn">
                                <span className="icon icon-sm icon-member" />
                                <p>Members</p>
                            </button>
                            <button className="btn">
                                <span className="icon icon-sm icon-label" />
                                <p>Labels</p>
                            </button>
                            <button className="btn">
                                <span className="icon icon-sm icon-checklist" />
                                <p>Checklist</p>
                            </button>
                            <button className="btn">
                                <span className="icon icon-sm icon-clock" />
                                <p>Dates</p>
                            </button>
                            <button className="btn">
                                <span className="icon icon-sm icon-attachment" />
                                <p>Attachment</p>
                            </button>
                            <button className="btn">
                                <span className="icon icon-sm icon-card-cover" />
                                <p>Cover</p>
                            </button>
                            <button className="btn">
                                <span className="icon icon-sm icon-custom-field" />
                                <p>Custom Fields</p>
                            </button>
                        </section>
                    </section>
                    <section className="task-details-sidebar-module">
                        <h3 className="task-details-sidebar-module-title">Power-Ups</h3>
                        <section className="task-details-sidebar-module-list">
                            <CreateItem />
                        </section>
                    </section>
                    <section className="task-details-sidebar-module">
                        <h3 className="task-details-sidebar-module-title">Automation</h3>
                        <button className="btn"><span className="icon icon-sm icon-information" /></button>
                        <section className="task-details-sidebar-module-list">
                            <CreateItem />
                        </section>
                    </section>
                    <section className="task-details-sidebar-module">
                        <h3 className="task-details-sidebar-module-title">Actions</h3>
                        <section className="task-details-sidebar-module-list">
                            <button className="btn">
                                <span className="icon icon-sm icon-move" />
                                <p>Move</p>
                            </button>
                            <button className="btn">
                                <span className="icon icon-sm icon-copy" />
                                <p>Copy</p>
                            </button>
                            <button className="btn">
                                <span className="icon icon-sm icon-template-card" />
                                <p>Make template</p>
                            </button>
                            <button className="btn">
                                <span className="icon icon-sm icon-archive" />
                                <p>Archive</p>
                            </button>
                            <button className="btn">
                                <span className="icon icon-sm icon-share" />
                                <p>Share</p>
                            </button>
                        </section>
                    </section>
                </section>
            </article>
        </Modal>
    )
}