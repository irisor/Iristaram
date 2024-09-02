import { utilService } from '../util.service'
import { httpService } from '../http.service'

export const boardService = {
    query,
    getById,
    save,
    remove,
    addGroup,
    removeGroup,
    updateGroup,
    updateTask,
    addTask,
    removeTask,
}

async function query(filterBy = { title: '' }) {
    let boards = await httpService.get('board', filterBy)
    // Return just preview info about the boards
    boards = boards.map(({ _id, title, isStarred, backgroundImg }) => ({ _id, title, isStarred, backgroundImg }))
    return boards
}

async function getById(boardId) {
    try {
        let board = await httpService.get(`board/${boardId}`)
        return board
    } catch (err) {
        console.log('err:', err)
        throw err
    }
}

async function remove(boardId) {
    try {
        let data = await httpService.delete(`board/${boardId}`)
        return data
    } catch (err) {
        console.log('err:', err)
        throw err
    }
}

async function save(board) {
    try {
        let savedBoard
        if (board._id) {
            savedBoard = await httpService.put(`board`, board)
        } else {
            savedBoard = await httpService.post(`board`, board)
        }
        // return savedBoard.data
        return savedBoard
    } catch (err) {
        console.log('err:', err)
        throw err
    }
}

async function addGroup(boardId, group) {
    try {
        let board = await httpService.get(`board/${boardId}`)
        if (!board.groups) board.groups = []
        if (!group.id) group.id = utilService.makeId()

        board.groups.push(group)
        await httpService.put(`board`, board)

        return group
    } catch (err) {
        console.log('err:', err)
        throw err
    }
}

async function removeGroup(boardId, groupId) {
    try {
        let board = await httpService.get(`board/${boardId}`)
        const groupIdx = board.groups?.findIndex(g => g.id === groupId)
        board.groups?.splice(groupIdx, 1)

        await httpService.put(`board`, board)
    } catch (err) {
        console.log('err:', err)
        throw err
    }
}

async function updateGroup(boardId, group) {
    try {
        let board = await httpService.get(`board/${boardId}`)
        const groupIdx = board.groups.findIndex(g => g.id === group.id)
        board.groups[groupIdx] = group

        await httpService.put(`board`, board)

        return group
    } catch (err) {
        console.log('err:', err)
        throw err
    }
}

async function updateTask(boardId, groupId, task) {
    try {
        let board = await httpService.get(`board/${boardId}`)
        const groupIndex = board.groups.findIndex(g => g.id === groupId)
        const taskIdx = board.groups[groupIndex].tasks.findIndex(t => t.id === task.id)
        board.groups[groupIndex].tasks[taskIdx] = task
        console.log("FE board:", board, groupId, task)

        await httpService.put(`board`, board)

        return task
    } catch (err) {
        console.log('err:', err)
        throw err
    }
}

async function addTask(boardId, groupId, newTask) {
    try {
        let board = await httpService.get(`board/${boardId}`)
        const groupIndex = board.groups.findIndex(g => g.id === groupId)
        if (!newTask.id) newTask.id = utilService.makeId()
        if (!board.groups[groupIndex].tasks)
            board.groups[groupIndex].tasks = []
        board.groups[groupIndex].tasks.push(newTask)
        console.log("FE board:", board, groupId, newTask)
        await httpService.put(`board`, board)

        return newTask
    } catch (err) {
        console.log('err:', err)
        throw err
    }
}

async function removeTask(boardId, groupId, taskId) {
    try {
        let board = await httpService.get(`board/${boardId}`)
        const groupIndex = board.groups.findIndex(g => g.id === groupId)
        const taskIndex = board.groups[groupIndex].tasks.findIndex(t => t.id === taskId)
        board.groups[groupIndex].tasks.splice(taskIndex, 1)
        await httpService.put(`board`, board)
    } catch (err) {
        console.log('err:', err)
        throw err
    }
}
