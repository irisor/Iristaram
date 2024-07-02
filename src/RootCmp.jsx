import { Routes, Route } from 'react-router'

import { HomePage } from './pages/HomePage'
import { BoardIndex } from './pages/BoardIndex.jsx'

import { BoardDetails } from './pages/BoardDetails'
import { TaskDetails } from './pages/TaskDetails'

import { AppHeader } from './cmps/AppHeader'
import { AppSidebar } from './cmps/AppSidebar.jsx'

export function RootCmp() {
    return (
        <div className='app'> 
            <AppHeader />
            <AppSidebar />
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


