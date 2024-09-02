import { useSelector } from "react-redux"
import { useEffect } from "react"
import { BoardRemove } from "./BoardRemove"
import { Popover } from "antd"
import { useMultiPopover } from "../../customHooks/useMultiPopover"

export function BoardMenuMain({ onNavigate, onContentReady }) {
	const board = useSelector(storeState => storeState.boardModule.board)
	const { isPopoverOpen, openPopover, closePopover } = useMultiPopover()

	useEffect(() => {
		if (onContentReady) {
			onContentReady()
		}
	}, [])

	function toggleDarkMode() {
		document.documentElement.dataset.theme =
			document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
	}

	return (
		<nav className="board-menu-main">
			<button className="board-menu-main-link btn btn-menu-simple" onClick={() => onNavigate('background')}>
				<span className="icon-wrapper background">
					{board.backgroundImg &&
						<img className='app-sidebar-item-img' src={board.backgroundImg} width="24" height="20" />
					}
				</span>
				<p>Change background</p>
			</button>

			<Popover content={props => BoardRemove({ ...props, onClose: closePopover })}
				open={isPopoverOpen(`popover-remove-board${board._id}`)}
				onOpenChange={(open) => {
					if (open) {
						openPopover(`popover-remove-board${board._id}`)
					} else {
						closePopover()
					}
				}}
				placement="bottomLeft" trigger={"click"} arrow={false}>
				<button className="board-menu-main-link btn btn-menu-simple">
					<span className="icon-wrapper">
						<span className="icon icon-sm icon-remove" />
					</span>
					<p>Remove board</p>
				</button>
			</Popover>

			<button className="board-menu-main-link btn btn-menu-simple" onClick={toggleDarkMode}>
				<span className="icon-wrapper">
					<span className="icon icon-sm icon-card-cover" />
				</span>
				<p>Toggle dark mode</p>
			</button>
		</nav>
	)
}