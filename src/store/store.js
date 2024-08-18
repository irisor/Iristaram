import { createStore, combineReducers } from 'redux'

import { boardReducer } from './board/board.reducer'
import { backgroundReducer } from './background/background.reducer'

const rootReducer = combineReducers({
    boardModule: boardReducer,
    backgroundModule: backgroundReducer
})


const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)

// For debug:
// store.subscribe(() => {
//     console.log('**** Store state changed: ****')
//     console.log('storeState:\n', store.getState())
//     console.log('*******************************')
// })



