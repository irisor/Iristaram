import { boardService as remoteService } from './board.service.js'
import { boardService as localService } from './board.service.local.js'
const { DEV, VITE_LOCAL } = import.meta.env


let isRemote = VITE_LOCAL !== 'true'
// isRemote = true

const service = isRemote ? remoteService : localService

export const boardService = {
	...service,
	getEmptyBoard,
	getFilterFromSearchParams,
	getDefaultFilter,
}

function getEmptyBoard() {
	return {
		title: '',
		activities: []
	}
}

function getFilterFromSearchParams(searchParams) {
	const defaultFilter = getDefaultFilter()
	const filterBy = {}
	for (const field in defaultFilter) {
		filterBy[field] = searchParams.get(field) || defaultFilter[field]
	}
	return filterBy
}

function getDefaultFilter() {
	return {
		txt: '',
		pageIdx: undefined,
	}
}

if (DEV) window.boardService = boardService