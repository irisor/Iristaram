
import { storageService } from './async-storage.service'
import { utilService } from './util.service'

const STORAGE_KEY = 'backgroundDB'
export const backgroundService = {
    getBackgroundImages,
}

_createBackgroundImages()


async function getBackgroundImages(filterBy = { name: '' }) {
    let backgroundImages = await storageService.query(STORAGE_KEY)
    if (filterBy.name) {
        const regex = new RegExp(filterBy.name, 'i')
        backgroundImages = backgroundImages.filter(backgroundImage => regex.test(backgroundImage))
    }

    return backgroundImages
}


function _createBackgroundImages() {
    let backgroundImages = utilService.loadFromStorage(STORAGE_KEY)
    if (!backgroundImages || !backgroundImages.length) {

        const backgroundImagesString = `
        [ 
            "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2560x1440/481563ddbf5af01d25d4b103d8f3e81b/photo-1674673353738-dc8039354dd0.webp",
            "https://images.unsplash.com/photo-1722084324252-5e33f13a71ba",
            "https://images.unsplash.com/photo-1719090024525-667c8fcf5bb9",
            "https://images.unsplash.com/photo-1722104946563-bdf378a766d0",
            "https://images.unsplash.com/photo-1721633617180-97c67428a48e",
            "https://images.unsplash.com/photo-1721766827830-961da6ed8c91"
        ]
        `
        backgroundImages = JSON.parse(backgroundImagesString)
        utilService.saveToStorage(STORAGE_KEY, backgroundImages)
    }
    return backgroundImages
}
