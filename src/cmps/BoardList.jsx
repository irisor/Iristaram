import { useSelector } from 'react-redux'

import { BoardPreview } from './BoardPreview'

export function BoardList({ onAddBoard }) {
	const boards = useSelector(storeState => storeState.boardModule.boards)

	return (
		<ul className="board-list" >
			<button className="btn create-board" onClick={onAddBoard}>Create new board</button>
			{
				boards.map(board =>
					<BoardPreview key={board._id} board={board}  />
				)
			}
		</ul >
	)
}