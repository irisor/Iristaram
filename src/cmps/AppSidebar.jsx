import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useEffect } from 'react'
import { loadBoards } from '../store/board.actions'

export function AppSidebar() {

	const boards = useSelector(storeState => storeState.boardModule.boards)

	useEffect(() => {
        loadBoards()
    }, [])

	return (
		<section className="app-sidebar">
			<div className="app-sidebar-boards">
				<h2 className="app-sidebar-boards-title">Your boards</h2>

				<ul className="app-sidebar-boards-list">
					{boards.map(board => (
						<li key={board._id}><NavLink to={`/boards/${board._id}`} className="app-sidebar-item btn">{board.title}</NavLink></li>
					))}
				</ul>
			</div>
		</section>

	)
}