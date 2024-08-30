export const SET_BACKGROUND_IMAGES = 'SET_BACKGROUND_IMAGES'

const initialState = {
	background : {
		backgroundImages: [],
	}
}

export function backgroundReducer(state = initialState, action) {
    let newState = state
    switch (action.type) {
        case SET_BACKGROUND_IMAGES:
            newState = { ...state, background: { ...state.background, backgroundImages: action.backgroundImages } }
            break
    
        default:
            return state
    }
    return newState
}
