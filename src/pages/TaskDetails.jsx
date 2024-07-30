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
            {task?.cover && (
                <section className='task-details-cover'>
                    <img className='task-details-cover-img' src={task.cover} alt="cover" />
                    <div className="task-details-cover-menu">
                        <button className="btn task-details-cover-menu-item">
                            <span className="icon icon-sm icon-card-cover"></span>
                            &nbsp;Cover
                        </button>
                    </div>
                </section>
            )}

            <article className='task-details-content'>
                <section className='task-details-header'>
                    <div className="task-details-header-icon icon icon-lg icon-card"></div>
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
                                        <img className="avatar" src="../../src/assets/img/member.png" alt="avatar" width="32" height="32" />
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
                    <section className="task-details-main-item description">
                        <section className="task-details-main-item-header">
                            <span className="icon icon-lg icon-description" />
                            <h3>Description</h3>
                            {task?.description && <button className="btn">Edit</button>}
                        </section>
                        <section className="task-details-main-item-content">
                            {task?.description && <p>{task.description}</p>}
                            {!task?.description && <a className="task-details-add-description btn" href="#">Add a more detailed description...</a>}
                        </section>
                    </section>
                    {task?.attachments?.length > 0 && (
                        <section className="task-details-main-item attachments">
                            <section className="task-details-main-item-header">
                                <span className="icon icon-lg icon-attachment" />
                                <h3>Attachments</h3>
                                <button className="btn">Add</button>
                            </section>
                            <section className="task-details-main-item-content">
                                {task?.attachments?.map((attachment) => {
                                    const attachmentName = attachment.split('/').pop().split('?')[0];
                                    return (
                                        <article key={attachment} className="task-details-attachment-item">
                                            <a className="task-details-attachment-thumbnail-preview" href="#">
                                                <img className="task-details-attachment-thumbnail-img" src={attachment} alt={attachmentName} width="112" height="80" />
                                            </a>
                                            <section className="task-details-attachment-thumbnail-details">
                                                <span className="task-details-attachment-thumbnail-details-first-line">
                                                    <a href="#" className="task-details-attachment-thumbnail-name">{attachmentName}</a>
                                                    <span className="icon icon-sm icon-external-link"></span>
                                                </span>
                                                <span className="task-details-attachment-thumbnail-details-second-line">
                                                    <span className="task-details-attachment-thumbnail-option">Added 3 hours ago</span>

                                                    <span className="task-details-attachment-thumbnail-option"><a href="#">Comment</a></span>
                                                    <span className="task-details-attachment-thumbnail-option"><a href="#">Download</a></span>
                                                    <span className="task-details-attachment-thumbnail-option"><a href="#">Delete</a></span>
                                                    <span className="task-details-attachment-thumbnail-option"><a href="#">Edit</a></span>
                                                </span>
                                                <span className="task-details-attachment-thumbnail-details-third-line">
                                                    <span className="task-details-attachment-thumbnail-option">
                                                        <span className="icon icon-sm icon-card-cover"></span>
                                                        { task.cover === attachment ? <a href="#">Remove cover</a> : <a href="#">Make cover</a> }
                                                    </span>
                                                </span>
                                            </section>
                                        </article>
                                    )
                                })}
                            </section>
                        </section>
                    )}
                    <section className="task-details-main-item activity">
                        <section className="task-details-main-item-header">
                            <span className="icon icon-lg icon-activity"></span>
                            <h3>Activity</h3>
                            <button className="btn">Hide Details</button>
                        </section>
                        <section className="task-details-main-item-content">
                            <article className="task-details-activity-item">
                                <div className="task-details-activity-item-desc">some activity</div>
                                <div className="task-details-activity-item-time">Jul 14, 2024, 9:33 PM</div>
                            </article>
                        </section>
                    </section>
                </section>
                <section className="task-details-sidebar">
                    <section className="task-details-sidebar-module-list">
                        {!task.memberIds?.length && (
                            <>
                                <div className="task-details-sidebar-module-title with-btn">
                                    <h3 className="task-details-sidebar-module-title-text">Suggested</h3>
                                    <button className="btn"><span className="icon icon-sm icon-gear" /></button>
                                </div>
                                <section className="task-details-sidebar-module">
                                    <button className="btn members span1">
                                        <span className="icon icon-sm icon-member" />
                                        <p>Join</p>
                                    </button>
                                </section>
                            </>
                        )}
                    </section>
                    <section className="task-details-sidebar-module-list">
                        <h3 className="task-details-sidebar-module-title">Add to card</h3>
                        <section className="task-details-sidebar-module">
                            <button className="btn members span1">
                                <span className="icon icon-sm icon-member" />
                                <p>Members</p>
                            </button>
                            <button className="btn labels span1">
                                <span className="icon icon-sm icon-label" />
                                <p>Labels</p>
                            </button>
                            <button className="btn checklist span2">
                                <span className="icon icon-sm icon-checklist" />
                                <p>Checklist</p>
                            </button>
                            <button className="btn dates span1">
                                <span className="icon icon-sm icon-clock" />
                                <p>Dates</p>
                            </button>
                            <button className="btn attachment span2">
                                <span className="icon icon-sm icon-attachment" />
                                <p>Attachment</p>
                            </button>
                            <button className="btn cover span1">
                                <span className="icon icon-sm icon-card-cover" />
                                <p>Cover</p>
                            </button>
                            <button className="btn custom-fields span2">
                                <span className="icon icon-sm icon-custom-field" />
                                <p>Custom Fields</p>
                            </button>
                        </section>
                    </section>
                    <h3 className="task-details-sidebar-module-title">Power-Ups</h3>
                    <section className="task-details-sidebar-module">
                        <section className="task-details-sidebar-module-list">
                            <button className="btn cover span1">
                                <span className="icon icon-md icon-add" />
                                <p>Add Power-Ups</p>
                            </button>
                        </section>
                    </section>
                    <div className="task-details-sidebar-module-title with-btn">
                        <h3 className="task-details-sidebar-module-title-text">Automation</h3>
                        <button className="btn"><span className="icon icon-sm icon-information" /></button>
                    </div>
                    <section className="task-details-sidebar-module">
                        <section className="task-details-sidebar-module-list">
                            <button className="btn cover span1">
                                <span className="icon icon-md icon-add" />
                                <p>Add button</p>
                            </button>
                        </section>
                    </section>
                    <h3 className="task-details-sidebar-module-title">Actions</h3>
                    <section className="task-details-sidebar-module">
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
                    </section>
                    <hr></hr>
                    <section className="task-details-sidebar-module">
                        <button className="btn">
                            <span className="icon icon-sm icon-archive" />
                            <p>Archive</p>
                        </button>
                    </section>
                    <section className="task-details-sidebar-module">
                        <button className="btn">
                            <span className="icon icon-sm icon-share" />
                            <p>Share</p>
                        </button>
                    </section>
                </section>
            </article>
        </Modal >
    )
}