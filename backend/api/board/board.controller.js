import { loggerService } from "../../services/logger.service.js"
import { boardService } from "./board.service.js"

export async function getBoards(req, res) {
	const { txt, pageIdx } = req.query
    const filterBy = { txt, pageIdx: +pageIdx || 0 }

    try {
        const boards = await boardService.query(filterBy)
        console.log(boards)
        res.send(boards)
    } catch (err) {
        console.log('err:', err)
        res.status(400).send(`Couldn't get boards`)
    }
}

export async function getBoard(req, res) {
    const { boardId } = req.params
    console.log('board.controller boardId:', boardId)

    try {
        const board = await boardService.getById(boardId)
        res.send(board)
    } catch (err) {
        console.log('err:', err)
        res.status(400).send(`Couldn't get board`)
    }
}

export async function removeBoard(req, res) {
    try {
		const boardId = req.params.boardId
		const removedId = await boardService.remove(boardId)

		res.send(removedId)
	} catch (err) {
		loggerService.error('Failed to remove board', err)
		res.status(400).send({ err: 'Failed to remove board' })
	}
}

export async function addBoard(req, res) {
    const { loggedinUser, body: board } = req

	try {
		board.owner = loggedinUser
		const addedBoard = await boardService.add(board)
		res.json(addedBoard)
	} catch (err) {
		loggerService.error('Failed to add board', err)
		res.status(400).send({ err: 'Failed to add board' })
	}
}

export async function updateBoard(req, res) {
    const { loggedinUser, body: board } = req
    const { _id: userId, isAdmin } = loggedinUser

    // if(!isAdmin && board.owner?._id !== userId) {
    //     res.status(403).send('Not your board...')
    //     return
    // }

	try {
		const updatedBoard = await boardService.update(board)
		res.json(updatedBoard)
	} catch (err) {
		loggerService.error('Failed to update board', err)
		res.status(400).send({ err: 'Failed to update board' })
	}
}

export async function getLabels(req, res) {
    try {
        const labels = await boardService.getLabels()
        res.send(labels)
    } catch (err) {
        loggerService.error('Cannot get labels, err:', err)
        res.status(400).send(`Couldn't get labels`)
    }
}

export async function getPdf(req, res) {
    try {
        const { filename, pdf } = await boardService.getPdf()
        res.setHeader('Content-disposition', `attachment; filename=${filename}`)
        res.set("Content-Type", "application/pdf");
        res.send(pdf)
    } catch (err) {
        loggerService.error('Cannot get pdf, err:', err)
        res.status(400).send(`Couldn't create pdf`)
    }
}
    