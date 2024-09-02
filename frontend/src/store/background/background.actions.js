import { backgroundService } from '../../services/background.service'
import { store } from '../store'
import { SET_BACKGROUND_IMAGES } from './background.reducer'

export async function loadBackgroundImages() {
    try {
        const backgroundImages = await backgroundService.getBackgroundImages()
        store.dispatch(getCmdSetBackgroundImages(backgroundImages))
    } catch (err) {
        console.log('Cannot load background images', err)
        throw err
    }
}

function getCmdSetBackgroundImages(backgroundImages) {
    return {
        type: SET_BACKGROUND_IMAGES,
        backgroundImages
    }
}