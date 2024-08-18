import { useModal } from "../../customHooks/useModal"
import { BoardRemove } from "./BoardRemove"
import { BoardChangeBackground } from "./BoardChangeBackground"
import { useSelector } from "react-redux"
import { MenuCarousel } from "../menuCarousel/MenuCarousel"
import { useEffect } from "react"
import { BoardMenuMain } from "./BoardMenuMain"

export function BoardMenu({ toggleMenu }) {
	// const { isOpen, openModal, closeModal } = useModal()
	// const board = useSelector(storeState => storeState.boardModule.board)
	const menuComponents = {
		main: { component: BoardMenuMain, title: 'Menu' },
		background: { component: (props) => <BoardChangeBackground {...props} toggleMenu={toggleMenu} />, title: 'Change background' },
	}

	return (
		<div className="board-menu">
			<MenuCarousel menuComponents={menuComponents} onClose={toggleMenu} />
		</div>
	)
}
