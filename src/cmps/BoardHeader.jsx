import { useSelector } from 'react-redux'
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IconContext } from "react-icons";

export function BoardHeader({ toggleMenu }) {
	const board = useSelector(storeState => storeState.boardModule.board)
	return (
		<div className="board-details-header">
			<div className="board-title">{board.title}</div>
			<button className="board-btn-menu" onClick={()=>toggleMenu()}>
				<IconContext.Provider value={{ color: 'inherit' }}>
					<HiOutlineDotsHorizontal />
				</IconContext.Provider>

			</button>
		</div >
	)
}