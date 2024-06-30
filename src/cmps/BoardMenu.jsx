import { IconContext } from "react-icons";
import { AiOutlineClose } from "react-icons/ai";

export function BoardMenu({ toggleMenu }) {
	return (
		<div className="board-menu">
			<button className="board-btn-close-menu btn icon" onClick={() => toggleMenu()}>
				<IconContext.Provider value={{ color: 'inherit' }}>
					<AiOutlineClose />
				</IconContext.Provider>
			</button>
			<p>Board menu</p>
		</div>
	)
}