import { useModal } from "../../customHooks/useModal";
import { BoardRemove } from "./BoardRemove";
import { BoardChangeBackground } from "./BoardChangeBackground";
import { useSelector } from "react-redux";

export function BoardMenu({ toggleMenu }) {
	const { isOpen, openModal, closeModal } = useModal()
	const board = useSelector(storeState => storeState.boardModule.board)

	return (
		<div className="board-menu">
			<div className="board-menu-header">
				<h3 className="board-menu-title">Menu</h3>
				<button className="board-menu-close btn icon-wrapper" onClick={() => toggleMenu()}>
					<span className="icon icon-lg icon-close" />
				</button>
			</div>
			<hr className="board-menu-hr" />
			<nav className="board-menu-nav">
				<button className="board-menu-nav-link btn" onClick={openModal}>
					<span className="icon-wrapper">
						<img className='app-sidebar-item-img' src={board?.backgroundImg} width="24" height="20" />
					</span>
					<p>Change background</p>
				</button>
				<button className="board-menu-nav-link btn" onClick={openModal}>
					<span className="icon-wrapper">
						<span className="icon icon-sm icon-remove" />
					</span>
					<p>Remove board</p>
				</button>
				<BoardChangeBackground toggleMenu={toggleMenu} />
				<BoardRemove isOpen={isOpen} closeModal={closeModal} />
			</nav>
		</div>
	)
}