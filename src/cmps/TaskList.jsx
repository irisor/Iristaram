import { Link } from "react-router-dom";
import { TaskPreview } from "./TaskPreview";
import { useEffect, useRef } from "react";
import {useSelector} from "react-redux";

export function TaskList({props}){
    const {groupId , onAdd,onRemove, onUpdate} = props
    const tasks = useSelector(storeState => storeState.boardModule.board.groups.find(group=> group.id == groupId).tasks)

    const elListRefs = useRef([])

    useEffect(() => {

    }, [])

    function handleRef(el, idx){
        elListRefs.current[idx] = el
    }


    return (
        <ul className="task-list">
            {tasks.map((task, idx) =>
                <li ref={(el) => handleRef(el, idx)} key={task.id} >
                     <TaskPreview task={task} />
                    <section className="task-actions">
                        <button onClick={() => onRemove(groupId, task.id)}>X</button>
                        <Link style={{ color: 'white' }} to={`/${task.id}`}>Edit</Link>
                    </section>
                </li>
            )}
        </ul>
    )

}