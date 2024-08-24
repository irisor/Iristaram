import { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { GroupList } from '../cmps/group/GroupList'
import { BoardMenu } from '../cmps/board/BoardMenu'
import { BoardHeader } from '../cmps/board/BoardHeader'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'

import { updateBoard, loadBoard, addGroup, removeGroup, updateGroup, removeTask, addTask, updateTask } from '../store/board/board.actions'


export function BoardDetails() {

  const { boardId, taskId } = useParams()
  const board = useSelector(storeState => storeState.boardModule.board)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // console.log('board.details:', board, boardId)

  useEffect(() => {
    initBoard(boardId)
  }, [boardId])

  useEffect(() => {
    if (board) {
      if (board.backgroundImg) {
        document.body.style.backgroundImage = `url(${board?.backgroundImg})`;
      } else {
        document.body.style.backgroundImage = '';
      }
    }

    return () => {
      document.body.style.backgroundImage = '';
    }
  }, [board]);

  async function initBoard(boardId) {
    await loadBoard(boardId)
  }

  function onAddGroup(boardId) {
    return function (groupTitle) {
      if (!groupTitle) return
      try {
        addGroup(boardId, groupTitle)
        showSuccessMsg(`Group added`)
      } catch (err) {
        showErrorMsg('Cannot add group')
      }
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

  async function onRemoveTask(groupId, taskId) {
    try {
      await removeTask(boardId, groupId, taskId, "Removed Task")
      showSuccessMsg(`Task removed`)
    } catch (err) {
      showErrorMsg('Cannot remove task')
    }
  }


  function onUpdateTaskTitle(groupId, task, newTitle) {
    if (!newTitle) return
    try {
      task.title = newTitle
      updateTask(boardId, groupId, task)
      showSuccessMsg(`Task title updated`)
    } catch (err) {
      showErrorMsg('Cannot update task title')
    }
  }

  function toggleMenu () {
    setIsMenuOpen(!isMenuOpen)
  }

  function onDragStart(ev, task, groupId) {
    ev.dataTransfer.setData('text', JSON.stringify({ task, groupId }))
    ev.dataTransfer.dropEffect = "move";
  }

  function onDragOver(ev) {
    ev.preventDefault()
  }

  async function onDragDrop(ev, dropGroupId) {
    const { task, groupId } = JSON.parse(ev.dataTransfer.getData('text'))
    const newBoard = { ...board }
    const groupIndex = newBoard.groups.findIndex(g => g.id === groupId)
    const taskIndex = newBoard.groups[groupIndex].tasks.findIndex(t => t.id === task.id)
    newBoard.groups[groupIndex].tasks.splice(taskIndex, 1)
    const dropGroupIndex = newBoard.groups.findIndex(g => g.id === dropGroupId)
    newBoard.groups[dropGroupIndex].tasks.push(task)
    await updateGroup(boardId, newBoard.groups[dropGroupIndex])
    await updateGroup(boardId, newBoard.groups[groupIndex])
  }


  if (!board || !boardId) return <section>Loading...</section>
  return (
    <section className={`board-details ${isMenuOpen ? 'menu-open' : ''}`} onDragOver={onDragOver}>
      {board && <>

        <BoardHeader toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} onUpdateBoardTitle={onUpdateBoardTitle}>
        </BoardHeader>

        <main className="board-main">
          <GroupList
            onRemoveGroup={onRemoveGroup}
            onUpdateGroupTitle={onUpdateGroupTitle}
            onAddGroup={onAddGroup(boardId)}
            onDragStart={onDragStart}
            onDragDrop={onDragDrop}
            taskProps={{ onUpdateTaskTitle, onRemoveTask }}
          >
          </GroupList>
        </main>

        <BoardMenu toggleMenu={toggleMenu}>
        </BoardMenu>
      </>
      }
      {taskId && <Outlet />}
    </section>
  )

}