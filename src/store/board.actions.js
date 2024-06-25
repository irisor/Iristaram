import { boardService } from '../services/board.service.local'
import { store } from '../store/store'
import { ADD_BOARD, REMOVE_BOARD, SET_BOARDS, SET_BOARD, UPDATE_BOARD, ADD_GROUP, REMOVE_GROUP, UPDATE_TASK } from './board.reducer'

export async function loadBoards() {
    try {
        const boards = await boardService.query()
        console.log('Boards from DB:', boards)
        store.dispatch(getCmdSetBoards(boards))
    } catch (err) {
        console.log('Cannot load boards', err)
        throw err
    }
}

export async function loadBoard(boardId) {
    try {
        const board = await boardService.getById(boardId)
        console.log('Board from DB:', board)
        store.dispatch(getCmdSetBoard(board))
    } catch (err) {
        console.log('Cannot load board', err)
        throw err
    }
}

export async function removeBoard(boardId) {
    try {
        await boardService.remove(boardId)
        store.dispatch(getCmdRemoveBoard(boardId))
    } catch (err) {
        console.log('Cannot remove board', err)
        throw err
    }
}

export async function addBoard(board) {
    try {
        const savedBoard = await boardService.save(board)
        console.log('Added Board', savedBoard)
        store.dispatch(getCmdAddBoard(savedBoard))
        return savedBoard
    } catch (err) {
        console.log('Cannot add board', err)
        throw err
    }
}

export async function updateBoard(board) {
    try {
        const savedBoard = await boardService.save(board)
        console.log('Updated Board:', savedBoard)
        store.dispatch(getCmdUpdateBoard(savedBoard))
        return savedBoard
    } catch (err) {
        console.log('Cannot save board', err)
        throw err
    }
}

export async function addGroup(boardId, group) {
    try {
        const savedBoard = await boardService.addGroup(boardId, group)
        console.log('Added Group', group)
        store.dispatch(getCmdAddGroup(savedBoard))
        return savedBoard
    } catch (err) {
        console.log('Cannot add group', err)
        throw err
    }
}

export async function removeGroup(boardId, groupId) {
    try {
        await boardService.removeGroup(boardId, groupId)
        console.log('Removed Group', groupId)
        store.dispatch(getCmdRemoveGroup(boardId, groupId))
    } catch (err) {
        console.log('Cannot remove group', err)
        throw err
    }
}

export async function updateTask(boardId, groupId, task, activityTitle) {
    try {
        const [savedTask, activity] = await boardService.updateTask(boardId, groupId, task, activityTitle)
        console.log('Updated task', savedTask)
        store.dispatch(getCmdUpdateTask(groupId, task, activity))
        return savedTask
    } catch (err) {
        console.log('Cannot update task', err)
        throw err
    }
}

// Command Creators:
function getCmdRemoveBoard(boardId) {
    return {
        type: REMOVE_BOARD,
        boardId
    }
}

function getCmdAddBoard(board) {
    return {
        type: ADD_BOARD,
        board
    }
}

function getCmdUpdateBoard(board) {
    return {
        type: UPDATE_BOARD,
        board
    }
}

function getCmdSetBoards(boards) {
    return {
        type: SET_BOARDS,
        boards
    }
}

function getCmdSetBoard(board) {
    return {
        type: SET_BOARD,
        board
    }
}

function getCmdAddGroup(group) {
    return {
        type: ADD_GROUP,
        group
    }
}

function getCmdRemoveGroup(boardId, groupId) {
    return {
        type: REMOVE_GROUP,
        boardId,
        groupId
    }
}

function getCmdUpdateTask(groupId, task, activity) {
    return {
        type: UPDATE_TASK,
        groupId,
        task,
        activity
    }
}



// // unitTestActions()
// async function unitTestActions() {
//     await loadBoards()
//     await addBoard(boardService.getEmptyBoard())
//     await updateBoard({
//         _id: 'm1oC7',
//         title: 'Board-Good',
//     })
//     await removeBoard('m1oC7')
//     // TODO unit test loadBoard
//     // TODO unit test addBoardMsg
//     // TODO unit test updateTask
// }

