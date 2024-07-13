import { Link } from 'react-router-dom'

export function BoardPreview({ board }) {
	return (
		<Link to={`${board._id}`}>
			<li className="board-preview board-tile-fade" style={{backgroundImage: `url(${board?.backgroundImg})`}}>
				<div className='board-title-text'>{board.title}</div>
			</li>
		</Link>
	)
}