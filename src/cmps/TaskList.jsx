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
        <ul className="task-list">
            {tasks?.map((task, idx) =>
                <li ref={(el) => handleRef(el, idx)} key={task.id} >
                     <TaskPreview groupId ={groupId} task={task} onUpdateTaskTitle={onUpdateTaskTitle} onRemoveTask={onRemoveTask} />
                </li>
            )}
        </ul>
        <CreateItem onAddItem={onAddTask} initialBtnLbl='Add another task' addBtnLabel='Add task' placeholder='Enter task title...' groupId={groupId} />
        </>
    )

}