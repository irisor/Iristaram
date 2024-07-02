import { IconContext } from "react-icons";
import { AiOutlineClose } from "react-icons/ai";

export function BoardMenu({ toggleMenu }) {
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
		</div>
	)
}