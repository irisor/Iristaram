import { useEffect, useRef } from 'react'

import { loadBoards, removeBoard } from '../store/board.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { BoardList } from '../cmps/BoardList'
import { BoardAdd } from '../cmps/BoardAdd'
import { useModal } from '../customHooks/useModal'

export function BoardIndex() {
    const { isOpen, openModal, closeModal } = useModal()
    const clickRef = useRef(null)

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

    async function onAddBoard(ev) {
        ev.preventDefault()
        clickRef.current = ev.target
        openModal()        
    }

    return (
        <section className="board-index">
            <h2 className='board-index-title'>Boards</h2>
            <main className="board-list-container">
                <BoardList onAddBoard={onAddBoard} />
                <BoardAdd isOpen={isOpen} closeModal={closeModal} clickRef={clickRef} />
            </main>
        </section>
    )
}