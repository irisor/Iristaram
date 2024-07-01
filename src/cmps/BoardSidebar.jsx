import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useEffect } from 'react'
import { loadBoards } from '../store/board.actions'

export function BoardSidebar() {

	const boards = useSelector(storeState => storeState.boardModule.boards)

	useEffect(() => {
        loadBoards()
    }, [])

	return (
		<section className="board-sidebar">
			<div className="board-sidebar-boards">
				<h2 className="board-sidebar-boards-title">Your boards</h2>

				<ul className="board-sidebar-boards-list">
					{boards.map(board => (
						<li key={board._id}><NavLink to={`/boards/${board._id}`} className="board-sidebar-item btn">{board.title}</NavLink></li>
					))}
				</ul>
			</div>
		</section>

	)
}