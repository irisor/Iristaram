import { NavLink } from 'react-router-dom'

export function AppHeader() {

    return (
        <header className="app-header">
            <nav className="app-header-nav">
                <NavLink to="" aria-label="Back to home" className="app-header-logo btn">
                    <div className="logo-img"></div>
                </NavLink>
                <NavLink to="/boards" className="app-header-nav-link btn">Boards</NavLink>
            </nav>
        </header>
    )
}