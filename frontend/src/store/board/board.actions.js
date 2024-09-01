import { boardService } from '../../services/board/'
import { utilService } from '../../services/util.service'
import { store } from '../store'
import { ADD_BOARD, REMOVE_BOARD, SET_BOARDS, SET_BOARD, UPDATE_BOARD, ADD_GROUP, UPDATE_GROUP, REMOVE_GROUP, ADD_TASK, REMOVE_TASK, UPDATE_TASK } from './board.reducer'

export async function loadBoards() {
    try {
        const boards = await boardService.query()
        store.dispatch(getCmdSetBoards(boards))
    } catch (err) {
        console.log('Cannot load boards', err)
        throw err
    }
}

export async function loadBoard(boardId) {
    try {
        const board = await boardService.getById(boardId)
        store.dispatch(getCmdSetBoard(board))
        console.log('Board from DB:', board)
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
        store.dispatch(getCmdAddBoard(savedBoard))
        return savedBoard
    } catch (err) {
        console.log('Cannot add board', err)
        throw err
    }
}

export async function updateBoard(board) {
    try {
        store.dispatch(getCmdUpdateBoard(board))
        const savedBoard = await boardService.save(board)
        console.log('Updated Board:', savedBoard)
        return savedBoard
    } catch (err) {
        console.log('Cannot save board', err)
        throw err
    }
}

export async function addGroup(boardId, groupTitle) {
    try {
        let newGroup = getEmptyGroup(groupTitle, boardId)
        store.dispatch(getCmdAddGroup(newGroup))
        const savedGroup = await boardService.addGroup(boardId, newGroup)
        console.log('Added Group', savedGroup)
        return savedGroup
    } catch (err) {
        console.log('Cannot add group', err)
        throw err
    }
}

export async function removeGroup(boardId, groupId) {
    try {
        store.dispatch(getCmdRemoveGroup(boardId, groupId))
        boardService.removeGroup(boardId, groupId)
        console.log('Removed Group', groupId)

    } catch (err) {
        console.log('Cannot remove group', err)
        throw err
    }
}

export async function updateGroup(boardId, group) {
    try {
        store.dispatch(getCmdUpdateGroup(boardId, group))
        const savedBoard = await boardService.updateGroup(boardId, group)
        console.log('Updated Task', group)
        return savedBoard
    } catch (err) {
        console.log('Cannot update task', err)
        throw err
    }
}

export async function addTask(boardId, groupId, taskTitle) {
    try {
        let newTask = getEmptyTask(taskTitle)
        store.dispatch(getCmdAddTask(groupId, newTask))
        boardService.addTask(boardId, groupId, newTask)
        //console.log('Added task', newTask)
        return newTask
    } catch (err) {
        console.log('Cannot add task', err)
        throw err
    }
}

export async function removeTask(boardId, groupId, taskId) {
    try {
        console.log("taskId", taskId)
        store.dispatch(getCmdRemoveTask(groupId, taskId))
        boardService.removeTask(boardId, groupId, taskId)
        console.log('Task removed')
    } catch (err) {
        console.log('Cannot remove task', err)
        throw err
    }
}

export async function updateTask(boardId, groupId, task) {
    try {
        store.dispatch(getCmdUpdateTask(groupId, task))
        const savedTask = await boardService.updateTask(boardId, groupId, task)
        console.log('Updated task', savedTask)
        return savedTask
    } catch (err) {
        console.log('Cannot update task', err)
        throw err
    }
}

function getEmptyTask(title = "") {
    return {
        id: utilService.makeId(),
        title,
        description: "",
        memberIds: [],
        labelIds: [],
        checklist: {},
        dates: { startDate: "", dueDate: "", setReminder: "" },
        attachment: "",
        cover: ""

    }
}

function getEmptyGroup(title = "", boardId) {
    return {
        id: utilService.makeId(),
        title,
        tasks: [],
        boardId,
        closed: false,
        color: null
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

function getCmdUpdateGroup(boardId, group) {
    return {
        type: UPDATE_GROUP,
        boardId,
        group
    }
}

function getCmdAddTask(groupId, task, activity) {
    return {
        type: ADD_TASK,
        groupId,
        task,
        activity
    }
}

function getCmdRemoveTask(groupId, taskId) {
    return {
        type: REMOVE_TASK,
        groupId,
        taskId
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
