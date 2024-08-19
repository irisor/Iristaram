import { Routes, Route } from 'react-router'

import { HomePage } from './pages/HomePage'
import { BoardIndex } from './pages/BoardIndex.jsx'

import { BoardDetails } from './pages/BoardDetails'
import { TaskDetails } from './pages/TaskDetails'

import { AppHeader } from './cmps/app/AppHeader.jsx'
import { AppSidebar } from './cmps/app/AppSidebar.jsx'

export function RootCmp() {
    return (
        <div className='app'>
            <AppHeader />
            <AppSidebar />
            <main className='app-main'>
                <Routes>
                    <Route path="" element={<HomePage />} />
                    <Route path="/boards" element={<BoardIndex />}></Route>
                    <Route path="/boards/:boardId" element={<BoardDetails />}>
                        <Route path="/boards/:boardId/:taskId" element={<TaskDetails />} />
                    </Route>
                </Routes>
            </main>
        </div>
    )
}


