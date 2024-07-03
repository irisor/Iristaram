import { Link } from 'react-router-dom'

export function BoardPreview({ board }) {
	return (
		<li className="board-preview board-tile-fade">
			<Link to={`${board._id}`}>
				<div>{board.title}</div>
			</Link>

			{/* {shouldShowActionBtns(board) && <div>
					<button className="btn" onClick={() => { onRemoveBoard(board._id) }}>x</button>
					<button className="btn" onClick={() => { onUpdateBoard(board) }}>Edit</button>
				</div>} */}
		</li>
	)
}