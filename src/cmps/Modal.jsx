export function Modal({ isOpen, closeModal, children, position={ insetInlineStart: '50%', insetBlockStart: '50%', transform: 'translate(-50%, -50%)' } }) {
  if (!isOpen) {
    return null
  }

  return (
    <>
      <div className="modal-overlay" onClick={closeModal}></div>
      <div className="modal" onClick={ev => ev.stopPropagation()} style={position}>
        <button className="close-button" onClick={closeModal}>
          Close
        </button>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </>
  )
}