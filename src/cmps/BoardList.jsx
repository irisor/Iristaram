import { useSelector } from 'react-redux'

import { BoardPreview } from './BoardPreview'
import { useModal } from '../customHooks/useModal'
import { BoardAdd } from './BoardAdd'

export function BoardList() {
	const boards = useSelector(storeState => storeState.boardModule.boards)
	const { isOpen, openModal, closeModal } = useModal()

	async function onAddBoard(ev) {
        ev.preventDefault()
        openModal()
    }

	return (
		<ul className="board-list" >
			<button className="btn create-board" onClick={onAddBoard}>Create new board</button>
			<BoardAdd isOpen={isOpen} closeModal={closeModal} />
			{
				boards.map(board =>
					<BoardPreview key={board._id} board={board}  />
				)
			}
		</ul >
	)
}