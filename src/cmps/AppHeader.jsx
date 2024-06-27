import { NavLink } from 'react-router-dom'

export function AppHeader() {

    return (
        <header className="app-header">
            <nav>
                <NavLink to="">Home</NavLink>
                <NavLink to="/boards">Boards</NavLink>

            </nav>
            <h1>My App</h1>
        </header>
    )
}