import { Link, useParams } from "react-router-dom";

export function TaskPreview({ task }) {
    const { boardId } = useParams()

    return (
        <div className="task-preview">
            <div className="task-preview-container">
                <Link to={`/boards/${boardId}/${task.id}`}>
                    <p>{task.title}</p>
                </Link>
            </div>
        </div>
    )
}
