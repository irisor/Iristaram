import { Link } from "react-router-dom";
import { TaskPreview } from "./TaskPreview";
import { useEffect, useRef } from "react";
import {useSelector} from "react-redux";
import { CreateItem } from './CreateItem'

export function TaskList({props}){
    const {groupId , onAddTask,onRemoveTask, onUpdateTaskTitle} = props
    let tasks = useSelector(storeState => storeState.boardModule.board.groups.find(group=> group.id == groupId).tasks)
    console.log(tasks, "In TaskList")

    const elListRefs = useRef([])

    useEffect(() => {

    }, [])

    function handleRef(el, idx){
        elListRefs.current[idx] = el
    }


    return (
        <>
        {tasks && <div className="task-list-top-gap"></div>}
        <ol className="task-list">
            {tasks?.map((task, idx) =>
                <li className="task-list-el" key={task.id} >
                     <TaskPreview groupId ={groupId} task={task} onUpdateTaskTitle={onUpdateTaskTitle} onRemoveTask={onRemoveTask} />
                </li>
            )}
        </ol>
        <CreateItem onAddItem={onAddTask} initialBtnLbl='Add a card' addBtnLabel='Add task' placeholder='Enter task title...' groupId={groupId} />
        </>
    )

}