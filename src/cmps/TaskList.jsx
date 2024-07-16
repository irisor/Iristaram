import { TaskPreview } from "./TaskPreview";
import { useSelector } from "react-redux";
import { CreateItem } from "./CreateItem";

export function TaskList({ props }) {
  const { groupId, onAddTask, onRemoveTask, onUpdateTaskTitle } = props;
  let tasks = useSelector(
    (storeState) =>
      storeState.boardModule.board.groups.find((group) => group.id == groupId)
        ?.tasks
  );
  
	function onInputTask(ev) {
		if (!ev || !ev.target) return
		ev.target.style.height = 'auto';
		ev.target.style.height = (ev.target.scrollHeight + 20) + 'px';
	}


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
      </ol>
      <div className="task-list-add-task">
        <CreateItem onAddItem={onAddTask} onInput={onInputTask} initialBtnLbl='Add a card' addBtnLabel='Add card' placeholder='Enter a title for this card...' groupId={groupId} />
      </div>
    </>
  );
}
