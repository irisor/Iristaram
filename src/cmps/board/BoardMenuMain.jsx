import { useSelector } from "react-redux"
import { useModal } from "../../customHooks/useModal"
import { useEffect } from "react"
import { BoardRemove } from "./BoardRemove"

export function BoardMenuMain({ onNavigate, onContentReady }) {
	const { isOpen, openModal, closeModal } = useModal()
	const board = useSelector(storeState => storeState.boardModule.board)

	useEffect(() => {
		if (onContentReady) {
			onContentReady()
		}
	}, [])

	function toggleDarkMode() {
		document.documentElement.dataset.theme = 
			document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
	}

	return (
		<nav className="board-menu-main">
			<button className="board-menu-main-link btn btn-menu-simple" onClick={() => onNavigate('background')}>
				<span className="icon-wrapper">
					<img className='app-sidebar-item-img' src={board?.backgroundImg} width="24" height="20" />
				</span>
				<p>Change background</p>
			</button>
			<button className="board-menu-main-link btn btn-menu-simple" onClick={openModal}>
				<span className="icon-wrapper">
					<span className="icon icon-sm icon-remove" />
				</span>
				<p>Remove board</p>
			</button>
			<BoardRemove isOpen={isOpen} closeModal={closeModal} />
			<button className="board-menu-main-link btn btn-menu-simple" onClick={toggleDarkMode}>
				<span className="icon-wrapper">
					<span className="icon icon-sm icon-card-cover" />
				</span>
				<p>Toggle dark mode</p>
			</button>
		</nav>
	)
}