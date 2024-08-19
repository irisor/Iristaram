import { useEffect } from "react"
import { useKeyDown } from "../customHooks/useKeyDown"
import { useClickOutside } from "../customHooks/useClickOutside"

export function Modal({ isOpen, closeModal, children, focusRef, refs, style }) {

  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus()
    }
  }, [isOpen])


  if (!isOpen) {
    return null
  }

  return (
    <>
      <div className="modal-overlay" onClick={closeModal}></div>
      <div className="modal" onClick={ev => ev.stopPropagation()} ref={refs} style={style}>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </>
  )
}