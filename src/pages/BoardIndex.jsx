import { useEffect } from 'react'

import { loadBoards } from '../store/board.actions'
import { BoardList } from '../cmps/board/BoardList'

export function BoardIndex() {

    useEffect(() => {
        loadBoards()
    }, [])

    return (
        <section className="board-index">
            <h2 className='board-index-title'>Boards</h2>
            <main className="board-list-container">
                <BoardList />
            </main>
        </section>
    )
}