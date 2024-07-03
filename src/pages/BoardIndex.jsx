import { useEffect } from 'react'

import { loadBoards, addBoard, updateBoard, removeBoard } from '../store/board.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { boardService } from '../services/board.service.local'
import { BoardList } from '../cmps/BoardList'

export function BoardIndex() {

    

    useEffect(() => {
        loadBoards()
    }, [])

    async function onRemoveBoard(boardId) {
        try {
            await removeBoard(boardId)
            showSuccessMsg('Board removed')            
        } catch (err) {
            showErrorMsg('Cannot remove board')
        }
    }

    async function onAddBoard() {
        const board = boardService.getEmptyBoard()
        board.title = prompt('Title?')
        try {
            const savedBoard = await addBoard(board)
            showSuccessMsg(`Board added (id: ${savedBoard._id})`)
        } catch (err) {
            showErrorMsg('Cannot add board')
        }        
    }

    return (
        <section className="board-index">
            <h2 className='board-index-title'>Boards</h2>
            <main className="board-list-container">
                <BoardList />
            </main>
        </section>
    )
}