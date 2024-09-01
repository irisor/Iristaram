// import escapeRegExp from 'lodash.escaperegexp' // Requiring lodash.escaperegexp here
import { ObjectId } from 'mongodb'
import { loggerService } from "../../services/logger.service.js"
import { readJsonFile } from "../../services/util.service.js"
import { dbService } from '../../services/db.service.js'
import { asyncLocalStorage } from '../../services/als.service.js'


const PAGE_SIZE = 4

export const boardService = {
    query,
    getById,
    remove,
    add,
    update,
}

_loadBoards()

async function query(filterBy) {

    try {
        const criteria = _buildCriteria(filterBy)
        const sort = _buildSort(filterBy)

        const collection = await dbService.getCollection('board')
        let boardCursor = await collection.find(criteria, { sort })

        if (filterBy?.pageIdx !== undefined) {
            // if (filterBy?.pageIdx !== undefined && !isNaN(filterBy.pageIdx)) {
            boardCursor.skip(filterBy.pageIdx * PAGE_SIZE).limit(PAGE_SIZE)
        }

        const boards = boardCursor.toArray()
        return boards

    } catch (err) {
        loggerService.error(`Couldn't get boards`, err)
        throw err
    }
}

async function getById(boardId) {
    console.log('board.service boardId:', boardId)
    let board = {}
    try {
        let criteria = { _id: ObjectId.createFromHexString(boardId) }

        const collection = await dbService.getCollection('board')
        board = await collection.findOne(criteria)

        if (!board) throw `Couldn't find board with _id ${boardId}`
        board.createdAt = board._id.getTimestamp()

        criteria = { aboutBoardId: boardId }

    } catch (err) {
        loggerService.error(`Couldn't get board by Id`, err)
        throw err
    }
    return board
}

async function remove(boardId) {
    // const { loggedinUser } = asyncLocalStorage.getStore()
    // const { _id: ownerId, isAdmin } = loggedinUser

    try {
        const criteria = {
            _id: ObjectId.createFromHexString(boardId),
        }
        // if (!isAdmin) criteria['owner._id'] = ownerId

        const collection = await dbService.getCollection('board')
        const res = await collection.deleteOne(criteria)

        if (res.deletedCount === 0) throw ('Not your board')
        return boardId
    } catch (err) {
        loggerService.error(`Couldn't get board`, err)
        throw err
    }
}

async function add(board) {
    try {
        const collection = await dbService.getCollection('board')
        await collection.insertOne(board)

        return board
    } catch (err) {
        loggerService.error('cannot insert board', err)
        throw err
    }
}

async function update(board) {

    try {
        const criteria = { _id: ObjectId.createFromHexString(board._id) }
        const collection = await dbService.getCollection('board')
        // pick only updatable properties
        const boardToSave = {
            title: board.title,
            labels: board.labels ? [...board.labels] : [],
            backgroundImages: board.backgroundImages ? [...board.backgroundImages] : [],
            groups: board.groups ? [...board.groups, ].map(group => (
                {
                    ...group,
                    tasks: group.tasks.map(task => ({
                        ...task,
                        labels: [...task?.labels],
                        checklists: [...task?.checklists],
                        attachments: [...task?.attachments],
                    })),
                }
            )) : [],
        }

        await collection.updateOne(criteria, { $set: boardToSave })

        return board
    } catch (err) {
        loggerService.error(`cannot update board ${board._id}`, err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const labels = filterBy.labels?.split(',')
    let criteria = {}

    criteria.$and = []

    // if (filterBy.txt && filterBy.txt.trim() !== '') {
    //     const txt = escapeRegExp(filterBy.txt)
    //     criteria.$and.push({
    //         $or: [
    //             { title: { $regex: txt, $options: 'i' } },
    //             { description: { $regex: txt, $options: 'i' } }
    //         ]
    //     })
    // }

    if (criteria.$and.length === 0) criteria = {}

    return criteria
}

function _buildSort(filterBy) {
    if (!filterBy.sortBy) return {}
    return { [filterBy.sortBy]: filterBy.sortDir }
}

async function _loadBoards() {
    try {
        const boards = readJsonFile('./data/board.json')
        
        const boardCollection = await dbService.getCollection('board')
        const isEmpty = await boardCollection.countDocuments() === 0

        if (isEmpty) {
            const boardsWithId = boards.map(board => ({ ...board, _id: new ObjectId()}))
            await boardCollection.insertMany(boardsWithId)
        }
    } catch (error) {
        console.error("Error in _loadBoards:", error)
        throw error
    }
}
