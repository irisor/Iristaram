import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { loadBoards } from '../../store/board/board.actions'

export function AppSidebar() {

	const boards = useSelector(storeState => storeState.boardModule.boards)
	const [collapsed, setCollapsed] = useState(false)

	useEffect(() => {
		loadBoards()
	}, [])

	return (
		<>
			<section className={`app-sidebar ${collapsed ? 'collapsed' : ''}`}>
				<div className="app-sidebar-header">
					<NavLink to="/" className="app-sidebar-header-logo">P</NavLink>
					<div className="app-sidebar-header-title">Project Manager</div>
					<button className="app-sidebar-collapse icon-wrapper btn" onClick={() => setCollapsed(!collapsed)}>
						<span className="icon icon-sm icon-back" />
					</button>
				</div>
				<div className="app-sidebar-boards">
					<h2 className="app-sidebar-boards-title">Your boards</h2>

					<ul className="app-sidebar-boards-list">
						{boards.map(board => (
							<li key={board._id}>
								<NavLink to={`/${board._id}`} className="app-sidebar-item btn">
									<img className='app-sidebar-item-img' src={board?.backgroundImg} width="24" height="20" />
									<p>{board.title}</p>
								</NavLink>
							</li>
						))}
					</ul>
				</div>
			</section>
			<section className={`app-sidebar-open ${collapsed ? 'collapsed' : ''}`} onClick={() => setCollapsed(!collapsed)}>
				<button className="icon-wrapper btn" >
					<span className="icon icon-sm icon-forward" />
				</button>
			</section>
		</>
	)
}