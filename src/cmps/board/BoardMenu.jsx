import { BoardChangeBackground } from "./BoardChangeBackground"
import { MenuCarousel } from "../menuCarousel/MenuCarousel"
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
