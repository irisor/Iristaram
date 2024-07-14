import { TaskPreview } from "./TaskPreview";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CreateTask } from "./CreateTask";
import { HiOutlinePlus } from 'react-icons/hi'
import { IconContext } from 'react-icons'
import { GiCarDoor } from "react-icons/gi";

export function TaskList({ props }) {
  const { groupId, onAddTask, onRemoveTask, onUpdateTaskTitle } = props;
  let tasks = useSelector(
    (storeState) =>
      storeState.boardModule.board.groups.find((group) => group.id == groupId)
        .tasks
  );

  const [showTaskCreateForm, setShowTaskCreateForm] = useState(false);
  console.log(tasks, "In TaskList");

  useEffect(() => {}, []);

  

  return (
    <>
      {tasks && <div className="task-list-top-gap"></div>}
      <ol className="task-list">
        {tasks?.map((task, idx) => (
          <li className="task-list-el" key={task.id}>
            <TaskPreview
              groupId={groupId}
              task={task}
              onUpdateTaskTitle={onUpdateTaskTitle}
              onRemoveTask={onRemoveTask}
            />
          </li>
        ))}
        {showTaskCreateForm && <li>
          <CreateTask onClose={() => setShowTaskCreateForm(false)} onAddTask={onAddTask} groupId={groupId} />
        </li>}
      </ol>
      {!showTaskCreateForm &&(
        
        <button className="btn add-task non-edit task" onClick={() => setShowTaskCreateForm(true)}>
          <span className="icon add-item">
          <IconContext.Provider value={{size: "16"}}>
            <HiOutlinePlus />
        </IconContext.Provider>
          </span>
          Add a card
          </button>
      )}
      {/* <CreateItem onAddItem={onAddTask} initialBtnLbl='Add a card' addBtnLabel='Add card' placeholder='Enter a title for this card...' groupId={groupId} /> */}
    </>
  );
}
