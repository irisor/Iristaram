import { useSelector } from 'react-redux'

import { BoardPreview } from './BoardPreview'
import { BoardAdd } from './BoardAdd'
import { useKeyDown } from '../../customHooks/useKeyDown'
import { Popover } from 'antd'
import { useMultiPopover } from '../../customHooks/useMultiPopover'

export function BoardList() {
	const boards = useSelector(storeState => storeState.boardModule.boards)
	const { isPopoverOpen, openPopover, closePopover, focusInput, setFocusInput } = useMultiPopover()
	useKeyDown(closeModal,isOpen,['Escape'])

	return (
		<ul className="board-list" >
			{/* <BoardAdd isOpen={isOpen} closeModal={closeModal} /> */}
			<Popover content={props => BoardAdd({ ...props, onClose: closePopover, focusInput, setFocusInput })}
				open={isPopoverOpen(`popover-add-board`)}
				onOpenChange={(open) => {
					if (open) {
						setFocusInput(true)
						openPopover(`popover-add-board`)
					} else {
						closePopover()
						setFocusInput(false)
					}
				}}
				placement="bottomLeft" trigger={"click"} arrow={false}>
				<button className="btn create-board">Create new board</button>
			</Popover>
			{
				boards.map(board =>
					<BoardPreview key={board._id} board={board} />
				)
			}
		</ul >
	)
}