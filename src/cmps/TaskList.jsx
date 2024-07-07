import { TaskPreview } from "./TaskPreview";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { CreateItem } from './CreateItem'

export function TaskList({ props }) {
    const { groupId, onAddTask, onRemoveTask, onUpdateTaskTitle } = props
    let tasks = useSelector(storeState => storeState.boardModule.board.groups.find(group => group.id == groupId).tasks)
    console.log(tasks, "In TaskList")

    useEffect(() => {

    }, [])

    return (
        <>
            <ul className="task-list">
                {tasks?.map(task =>
                    <TaskPreview key={task.id} groupId={groupId} task={task} onUpdateTaskTitle={onUpdateTaskTitle} onRemoveTask={onRemoveTask} />
                )}
            </ul>
            <CreateItem onAddItem={onAddTask} initialBtnLbl='Add another task' addBtnLabel='Add task' placeholder='Enter task title...' groupId={groupId} />
        </>
    )

}