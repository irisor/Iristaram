import { NavLink } from 'react-router-dom'

export function AppHeader() {

    return (
        <header className="app-header">
            <nav className="app-header-nav">
                <NavLink to="" aria-label="Back to home" className="logo"></NavLink>
                <NavLink to="/boards">Boards</NavLink>
            </nav>
        </header>
    )
}