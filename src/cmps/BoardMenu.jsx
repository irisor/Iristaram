import { IconContext } from "react-icons";
import { AiOutlineClose } from "react-icons/ai";
import { BoardRemove } from "./BoardRemove";
import { useModal } from "../customHooks/useModal";
import { IoRemove } from "react-icons/io5";

export function BoardMenu({ toggleMenu }) {
	const { isOpen, openModal, closeModal } = useModal()

	return (
		<div className="board-menu">
			<div className="board-menu-header">
				<h3 className="board-menu-title">Menu</h3>
				<button className="board-menu-close btn icon" onClick={() => toggleMenu()}>
					<IconContext.Provider value={{ color: 'inherit' }}>
						<AiOutlineClose />
					</IconContext.Provider>
				</button>
			</div>
			<hr className="board-menu-hr" />
			<nav className="board-menu-nav">
				<button className="board-menu-nav-link btn" onClick={openModal}>
					<span className="icon">
						<IoRemove />
					</span>
					<p>Remove board</p>
				</button>
				<BoardRemove isOpen={isOpen} closeModal={closeModal} />
			</nav>
		</div>
	)
}