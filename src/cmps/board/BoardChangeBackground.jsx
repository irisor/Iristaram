import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadBackgroundImages } from '../../store/background/background.actions'
import { updateBoard } from '../../store/board/board.actions'

export function BoardChangeBackground({ toggleMenu }) {
  const boardBackground = useSelector(storeState => storeState.backgroundModule.background)
  const [selectedBackground, setSelectedBackground] = useState(null)
  const board = useSelector(storeState => storeState.boardModule.board)

  useEffect(() => {
    setSelectedBackground({ backgroundImg: boardBackground?.backgroundImg })
    loadBackgroundImages()
  }, [])

  useEffect(() => {
    if (selectedBackground?.backgroundImg === boardBackground.backgroundImg) return
    updateBoard({ ...board, backgroundImg: selectedBackground?.backgroundImg })
    toggleMenu()
  }, [selectedBackground])

  return (
    <div
      className='background-menu'>
      <section className='background-menu-content'>
        {boardBackground?.backgroundImages?.map(image => (
          <div key={image} className='background-menu-image-item'>
            <button
              className='background-menu-image-item-btn btn'
              onClick={() => setSelectedBackground({ backgroundImg: image })}
            >
              <img src={image} alt='' height='96' />
            </button>
          </div>
        ))}
      </section>
    </div>
  )
}