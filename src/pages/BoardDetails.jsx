import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { GroupList } from '../cmps/GroupList'
import { BoardMenu } from '../cmps/BoardMenu'
import { BoardHeader } from '../cmps/BoardHeader'
import { updateBoard } from '../store/board.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'

import { loadBoard, addGroup, removeGroup, updateGroup, removeTask, addTask, updateTask } from '../store/board.actions'
import { TaskDetails } from './TaskDetails'


export function BoardDetails() {

  const { boardId, taskId } = useParams()
  const board = useSelector(storeState => storeState.boardModule.board)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  console.log('board.details:', board, boardId)
  console.log('taskId', taskId)

  useEffect(() => {
    loadBoard(boardId)
  }, [boardId])

  async function onAddGroup(boardId, newGroup) {
    if (!newGroup.title) return
    try {
      await addGroup(boardId, newGroup)
      showSuccessMsg(`Group added`)
    } catch (err) {
      showErrorMsg('Cannot add group')
    }
  }

  async function onRemoveGroup(boardId, groupId) {
    try {
      await removeGroup(boardId, groupId)
      showSuccessMsg(`Group removed`)
    } catch (err) {
      showErrorMsg('Cannot remove group')
    }
  }

  async function onUpdateGroupTitle(group, updatedTitle) {
    try {
      const newGroup = { ...group, title: updatedTitle }
      await updateGroup(boardId, newGroup)
      showSuccessMsg(`Group title updated`)
    } catch (err) {
      showErrorMsg('Cannot update group title')
    }
  }
  
  async function onUpdateBoardTitle(board, title) {
    if (!title) return 

    const boardToSave = { ...board, title }
    try {
        const savedBoard = await updateBoard(boardToSave)
        showSuccessMsg(`Board updated, new title: ${savedBoard.title}`)
    } catch (err) {
        showErrorMsg('Cannot update board')
    }        
}

async function onRemoveTask(groupId, taskId){
  try {
    console.log(taskId)
    await removeTask(boardId, groupId,taskId,"Removed Task")
    showSuccessMsg(`Task removed`)
  } catch (err) {
    showErrorMsg('Cannot remove task')
  }
}

async function onAddTask(groupId, taskTitle){
  if (!taskTitle) return
  try {
    await addTask(boardId, groupId, taskTitle)
    showSuccessMsg(`Task added`)
  } catch (err) {
    showErrorMsg('Cannot add task')
  }
}

async function onUpdateTaskTitle(groupId, task, newTitle){
  if(!newTitle){ return}
  try {
    task.title = newTitle
    await updateTask(boardId, groupId, task)
    showSuccessMsg(`Task title updated`)
  } catch (err) {
    showErrorMsg('Cannot update task title')
  }
}

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }


  if (!board || !boardId || boardId !== board._id) return <section>Loading...</section>
  return (
    <section className={`board-details ${isMenuOpen ? 'menu-open' : ''}`}>
      {board && <>

        <BoardHeader toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} onUpdateBoardTitle={onUpdateBoardTitle}>
        </BoardHeader>

        <main className="board-main">
          <GroupList
            onRemoveGroup={onRemoveGroup}
            onUpdateGroupTitle={onUpdateGroupTitle}
            onAddGroup={onAddGroup}
            taskProps={{onAddTask,onUpdateTaskTitle,onRemoveTask}}
          >
          </GroupList>
        </main>

        <BoardMenu toggleMenu={toggleMenu}>
        </BoardMenu>
        
      
        </>
      }
{taskId && <TaskDetails />}
    </section>
  )

}