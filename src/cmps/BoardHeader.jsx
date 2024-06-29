import { useSelector } from 'react-redux'

export function BoardHeader() {
	const board = useSelector(storeState => storeState.boardModule.board)
	return (
		<div className="board-details-header">
			<p>Board header</p>
			{board.title}
		</div>
	)
}