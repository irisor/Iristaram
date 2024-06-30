import { useSelector } from 'react-redux'
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IconContext } from "react-icons";

export function BoardHeader({ toggleMenu, isMenuOpen }) {
	const board = useSelector(storeState => storeState.boardModule.board)
	return (
		<div className="board-header">
			<h1 className="board-title">{board.title}</h1>
			{!isMenuOpen &&
				<button className="board-btn-menu btn icon" onClick={() => toggleMenu()}>
					<IconContext.Provider value={{ color: 'inherit' }}>
						<HiOutlineDotsHorizontal />
					</IconContext.Provider>

				</button>
			}
		</div >
	)
}