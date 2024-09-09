import { useSelector } from "react-redux"
import { TaskPreview } from "./TaskPreview"
import { CreateItem } from "../general/CreateItem"
import { addTask } from "../../store/board/board.actions"
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service"
import { setOpenCreateItem } from '../../store/general/general.actions'

export function TaskList({ props }) {
  const { groupId, onRemoveTask, onUpdateTaskTitle, onDragStart } = props
  const board = useSelector(storeState => storeState.boardModule.board)


  let tasks = useSelector(
    (storeState) =>
      storeState.boardModule.board.groups.find((group) => group.id == groupId)
        ?.tasks
  )

  function onAddTask(boardId, groupId) {
    return function (taskTitle) {
      if (!taskTitle) return
      try {
        addTask(boardId, groupId, taskTitle)
        showSuccessMsg(`Task added`)
      } catch (err) {
        showErrorMsg('Cannot add task')
      }
    }
  }

  return (
    <>
      {tasks && <div className="task-list-top-gap"></div>}
      <section className="task-list-container">
        <ol className="task-list">
          {tasks?.map((task) => (
            <li className="task-list-el" key={task.id}>
              <TaskPreview
                taskId={task.id}
                onUpdateTaskTitle={onUpdateTaskTitle}
                onRemoveTask={onRemoveTask}
                onDragStart={onDragStart}
              />
            </li>
          ))}
          <div className="task-list-add-task">
            <CreateItem
              onAddItem={onAddTask(board._id, groupId)}
              addBtnLabel='Add card'
              initialBtnLabel='Add a card'
              placeholder='Enter a title for this card...'
              thisId={`new-task-${groupId}`}
            />
          </div>
        </ol>
        <button className="btn create-item non-edit " onClick={() => {
          setOpenCreateItem(`new-task-${groupId}`)
        }}>
          <div className="icon add-item">
            <span className="icon icon-md icon-add" />
          </div>
          {'Add a card'}
        </button>
      </section>
    </>
  )
}
