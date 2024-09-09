import { NavLink } from 'react-router-dom'
import { useMultiPopover } from '../../customHooks/useMultiPopover'
import { Popover } from 'antd'
import { BoardAdd } from '../board/BoardAdd'

export function AppHeader() {
    const { isPopoverOpen, openPopover, closePopover, focusInput, setFocusInput } = useMultiPopover()

    return (
        <header className="app-header">
            <nav className="app-header-nav">
                <NavLink to="" aria-label="Back to home" className="app-header-logo btn">
                    <div className="logo-img"></div>
                </NavLink>
                <NavLink to="/" className="app-header-nav-link btn">Boards</NavLink>
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
				<button className="btn create-board">Create</button>
			</Popover>
            </nav>
        </header>
    )
}