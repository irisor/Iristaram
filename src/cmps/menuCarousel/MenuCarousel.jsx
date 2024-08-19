import { useState } from 'react'
import { MenuCarouselHeader } from './MenuCarouselHeader'
import { MenuCarouselItem } from './MenuCarouselItem'

export function MenuCarousel({ onClose, menuComponents }) {

  const componentKeys = Object.keys(menuComponents)
  const [activeKey, setActiveKey] = useState(componentKeys[0])
  const [history, setHistory] = useState([])

  function handleBack() {
    if (history.length > 0) {
      const newHistory = [...history]
      const previousKey = newHistory.pop()
      setActiveKey(previousKey)
      setHistory(newHistory)
    }
  }

  function handleNavigation(newKey) {
    setHistory([...history, activeKey])
    setActiveKey(newKey)
  }

  return (
    <div className="menu-carousel">
      <MenuCarouselHeader
        title={menuComponents[activeKey].title}
        showBack={history.length > 0}
        onBack={handleBack}
        onClose={onClose}
      />
      <div className="menu-carousel-content-container">
        {componentKeys.map(function(key) {
          const item = menuComponents[key]
          return (
            <MenuCarouselItem
              key={key}
              isActive={key === activeKey}
              isVisited={history.includes(key)}
              component={item.component}
              onNavigate={handleNavigation}
            />
          )
        })}
      </div>
    </div>
  )
}
