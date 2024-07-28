import { useSelector } from 'react-redux'
import { EditableTitle } from './EditableTitle';

export function BoardHeader({ toggleMenu, isMenuOpen, onUpdateBoardTitle }) {
	const board = useSelector(storeState => storeState.boardModule.board)

	return (
		<div className="board-header">
			<div className="board-header-title btn">
				<EditableTitle initialTitle={board?.title} tag='h1'
					onUpdateTitle={(title) => onUpdateBoardTitle(board, title)} />
			</div>
			{!isMenuOpen && (
				<button className="board-btn-menu btn icon-wrapper" onClick={() => toggleMenu()}>
					<span className="icon icon-sm icon-overflow-menu-horizontal" />
				</button>
			)}
		</div >
	)
}