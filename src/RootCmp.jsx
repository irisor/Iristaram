import { Routes, Route } from 'react-router'

import { HomePage } from './pages/HomePage'
import { BoardIndex } from './pages/BoardIndex.jsx'

import { BoardDetails } from './pages/BoardDetails'
import { TaskDetails } from './pages/TaskDetails'

import { AppHeader } from './cmps/AppHeader'

export function RootCmp() {
    return (
        <div className='app'> 
            <AppHeader />
            <main className='app-main'>
                <Routes>
                    <Route path="" element={<HomePage />} />
                    <Route path="/boards" element={<BoardIndex />}></Route>
                    <Route path="/boards/:boardId" element={<BoardDetails />} />
                    <Route path="/task" element={<TaskDetails />} />
                </Routes>
            </main>
        </div>
    )
}


