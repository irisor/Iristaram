import { Link } from 'react-router-dom'

export function BoardPreview({ board }) {
	return (
		<Link to={`${board._id}`}>
			<li className="board-preview board-tile-fade">
				<div>{board.title}</div>

				{/* {shouldShowActionBtns(board) && <div>
					<button className="btn" onClick={() => { onRemoveBoard(board._id) }}>x</button>
					<button className="btn" onClick={() => { onUpdateBoard(board) }}>Edit</button>
					</div>} */}
			</li>
		</Link>
	)
}