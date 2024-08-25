import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

export function Modal({ isOpen, closeModal, children, focusRef,  style, cmpClassName = '' }) {

  const [modalRoot, setModalRoot] = useState(null)

  useEffect(() => {

    let root;

    const existingModalRoot = document.getElementById('modal-root');
    if (existingModalRoot) {
      root = existingModalRoot;
    } else {
      root = document.createElement('div');
      root.setAttribute('id', 'modal-root');
      document.body.appendChild(root);
    }
    setModalRoot(root);

    return () => {
      if (root && root.parentNode) {
        root.parentNode.removeChild(root);
      }
    };
  }, []);

  useEffect(() => {
    if (focusRef?.current) {
      focusRef.current.focus()
    }
  }, [isOpen])


  if (!isOpen) {
    return null
  }

  return (
    <>
      {createPortal(
        <>
          <section className={`${cmpClassName}`}>
            <div className="modal-overlay" onClick={closeModal}></div>
            <div className={"modal-container"} onClick={ev => ev.stopPropagation()} style={style}>
              <div className="modal">
                {children}
              </div>
            </div>
          </section>
        </>
        , modalRoot)
      }
    </>
  )
}