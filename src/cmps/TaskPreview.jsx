import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export function TaskPreview({ task, onRemoveTask, onUpdateTaskTitle }) {
    const { boardId } = useParams()

    // useEffect(() => {
    //     // console.log('TaskPreviewtask:', task)
    // }, [task])

    return (
        <article className="task-preview">
            <Link to={`/boards/${boardId}/${task.id}`}>
                <h4>{task.title}</h4>
            </Link>
        </article>
    )
}
