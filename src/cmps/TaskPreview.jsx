import { Link } from "react-router-dom";

export function TaskPreview({task}){

    return (
        <article className="task-preview">
            <Link to={`/${task.id}`}>
                <h4>{task.title}</h4>
            </Link>
            <p>
                Status: {task.status} | Due: {task.dueDate}
                | MemberIds: {task.memberIds?.join()}
            </p>
        </article>
    )
}

// {group?.tasks?.map(task =>
//     <article key={task.id} className="task">
//         <Link to={`group/${group.id}/task/${task.id}`}>
//             <h4>{task.title}</h4>
//         </Link>
//         <p>
//             Status: {task.status} | Due: {task.dueDate}
//             | MemberIds: {task.memberIds?.join()}
//         </p>
//     </article>
// )}

