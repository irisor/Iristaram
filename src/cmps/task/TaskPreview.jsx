import { Link, useParams } from "react-router-dom";

export function TaskPreview({ task }) {
    const { boardId } = useParams()

    function toggleLabelCollapse(ev) {
        ev.stopPropagation()
        ev.preventDefault()
        ev.currentTarget.closest(".task-preview-labels").classList.toggle("collapsed")
    }

    return (
        <div className="task-preview">
            <Link to={`/boards/${boardId}/${task.id}`}>
                {task.cover?.url && <img className="task-preview-cover" src={task.cover?.url} alt="cover" />}
                <div className="task-preview-container">
                    <div className="task-preview-labels collapsed">
                        {task.labels?.map(label => <div key={label.id} className="task-preview-label" style={{ backgroundColor: label.color }} onClick={ev => toggleLabelCollapse(ev)}><div className="task-preview-label-title">{label.title}</div></div>)}
                    </div>
                    <p>{task.title}</p>
                </div>
            </Link>
        </div>
    )
}
