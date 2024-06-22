import { Routes, Route } from 'react-router'

import { HomePage } from './pages/HomePage'
import { BoardIndex } from './pages/BoardIndex.jsx'


import { UserDetails } from './pages/UserDetails'
import { BoardDetails } from './pages/BoardDetails'
import { TaskDetails } from './pages/TaskDetails'

import { AppHeader } from './cmps/AppHeader'

export function RootCmp() {
    return (
        <div>
            <AppHeader />
            <main>
                <Routes>
                    <Route path="" element={<HomePage />} />
                    <Route path="/boards" element={<BoardIndex />}></Route>
                    <Route path="/boards/:boardId" element={<BoardDetails />} />
                    <Route path="/user/:id" element={<UserDetails />} />
                    <Route path="/task" element={<TaskDetails />} />
                </Routes>
            </main>
        </div>
    )
}


