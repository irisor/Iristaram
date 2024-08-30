export const SET_OPEN_CREATE_ITEM = 'SET_OPEN_CREATE_ITEM'

const initialState = {
    openCreateItem: null,
}

export function generalReducer(state = initialState, action) {
    let newState = state
    switch (action.type) {
        case SET_OPEN_CREATE_ITEM:
            newState = { ...state, openCreateItem: action.openCreateItem }
            break

        default:
            return state
    }
    return newState
}
