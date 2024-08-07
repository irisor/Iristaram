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
    <div className='background-menu'>
      <header className='background-menu-header'>
        <h2 className='background-menu-header-title'>Change background</h2>
        <button className='btn icon-wrapper background-menu-header-close' >
          <span className="icon icon-sm icon-close" />
        </button>
      </header>
      <section className='background-menu-content'>
        {boardBackground?.backgroundImages?.map(image => (
          <div key={image} className='background-menu-image-item'>
            <button className='background-menu-image-item-btn btn' onClick={() => setSelectedBackground({ backgroundImg: image })} >
              <img src={image} alt='' width='148' height='96' />
            </button>
          </div>
        ))}
      </section>
    </div>
  )
}