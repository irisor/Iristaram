import express from 'express'
import { addBoard, getBoard, getBoards, removeBoard, updateBoard } from './board.controller.js'
import { log } from '../../middlewares/log.middleware.js'
import { requireAuth } from '../../middlewares/require-auth.middleware.js'

const router = express.Router()

router.get('/', log, getBoards)

router.get('/:boardId', log, getBoard)
router.delete('/:boardId', log, removeBoard)
router.post('/', log, addBoard)
router.put('/', log, updateBoard)
// router.get('/:boardId', log, getBoard)
// router.delete('/:boardId', log, requireAuth, removeBoard)
// router.post('/', log, requireAuth, addBoard)
// router.put('/', log, requireAuth, updateBoard)


export const boardRoutes = router