import { store } from '../store'
import { SET_OPEN_CREATE_ITEM } from './general.reducer'

export async function setOpenCreateItem(itemId) {
    try {
        store.dispatch(getCmdSetOpenCreateItem(itemId))
        return itemId
    } catch (err) {
        console.log('Cannot open create item', err)
        throw err
    }
}


function getCmdSetOpenCreateItem(itemId) {
    return {
        type: SET_OPEN_CREATE_ITEM,
        openCreateItem: itemId
    }
}