import { useEffect } from "react"

export function Modal({ isOpen, closeModal, children, focusRef, position = { insetInlineStart: '50%', insetBlockStart: '50%', transform: 'translate(-50%, -50%)' } }) {

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
      <div className="modal" onClick={ev => ev.stopPropagation()} style={position}>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </>
  )
}