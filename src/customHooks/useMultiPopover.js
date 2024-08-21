import { useState } from 'react'

export function useMultiPopover () {
  const [openPopoverId, setOpenPopoverId] = useState(null)
  const [onCloseCallback, setOnCloseCallback] = useState(null)


  function openPopover(id, onClose = null) {
    setOpenPopoverId(id)
    setOnCloseCallback(onClose)
  }

  function closePopover() {
    if (onCloseCallback) {
      onCloseCallback()
    }
    setOpenPopoverId(null)
    setOnCloseCallback(null)
  }

  function isPopoverOpen(id) {
    return openPopoverId === id
  }

  return {
    openPopover,
    closePopover,
    isPopoverOpen,
  }
}
