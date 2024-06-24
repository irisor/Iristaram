import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'

import { loadBoard, addGroup, updateBoard } from '../store/board.actions'


export function BoardDetails() {

  const { boardId } = useParams()
  const board = useSelector(storeState => storeState.boardModule.board)
  const [newGroup, setNewGroup] = useState(null)

  console.log('board.details:', board, boardId)

  useEffect(() => {
    console.log('BoardDetails useEffect: ', boardId)
    loadBoard(boardId)
  }, [boardId])

  function onAddEmptyGroup() {
    setNewGroup({ title: '' })
  }

  async function onAddGroup(boardId) {
    if (!newGroup.title) return
    try {
      await addGroup(boardId, newGroup)
      setNewGroup(null)
      showSuccessMsg(`Group added`)
    } catch (err) {
      showErrorMsg('Cannot add group')
    }
  }

  async function onRemoveGroup(groupId) {
    try {
      const newBoard = { ...board, groups: board.groups.filter(group => group.id !== groupId) }
      await updateBoard(newBoard)
      showSuccessMsg(`Group removed`)
    } catch (err) {
      showErrorMsg('Cannot remove group')
    }
  }

  function onChangeTitle(title) {
    setNewGroup({ ...newGroup, title })
  }

  if (!board || !boardId || boardId !== board._id) return <section>Loading...</section>
  return (
    <section className="board-details">
      <h1>Board Details</h1>
      {board && <div>
        <h3>
          {board.title}
        </h3>
        <section className="group-container">
          {board?.groups?.map(group =>
            <section key={group?.id} className="group">
              <h2 className="group-title">{group?.title} {group?.id}</h2>
              {group?.tasks?.map(task => {
                if (!task) {
                  console.log(board, task)
                  return
                }
                <article key={task.id} className="task">
                  <Link to={`group/${group.id}/task/${task.id}`}>
                    <h4>{task.title}</h4>
                  </Link>
                  <p>
                    Status: {task.status} | Due: {task.dueDate}
                    | MemberIds: {task.memberIds?.join()}
                  </p>
                </article>
              })}
              <button onClick={() => { onRemoveGroup(group?.id) }}>X</button>
            </section>
          )}
          {newGroup &&
            (
              <section key='new-group' className="group">
                <h2 className="group-title">{newGroup?.title} - new</h2>
                <input type="text" value={newGroup.title} onChange={(ev) => {
                  onChangeTitle(ev.target.value)
                }} />
                <button onClick={() => { onAddGroup(board?._id) }}>Add list</button>
              </section>
            )}
        </section>
        {!newGroup && <button onClick={() => { onAddEmptyGroup() }}>Add another list</button>}

      </div>
      }
      <Outlet />
    </section>
  )
}