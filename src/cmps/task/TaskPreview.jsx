import { Link, useParams } from "react-router-dom";

export function TaskPreview({ task }) {
    const { boardId } = useParams()

    return (
        <div className="task-preview">
            <Link to={`/boards/${boardId}/${task.id}`}>
                {task.cover?.url && <img className="task-preview-cover" src={task.cover?.url} alt="cover" />}
                <div className="task-preview-container">
                    <p>{task.title}</p>
                </div>
            </Link>
        </div>
    )
}
