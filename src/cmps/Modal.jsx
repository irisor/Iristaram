import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

export function Modal({ isOpen, closeModal, children, focusRef, refs, style, cmpClassName = '' }) {

  // The Modal can be activated either with refs, in which case it won't have an overlay, and it would be placed according to the refs
  // Or it can be activated with refs, in which case it will have an overlay, and it would be placed outside the parent in the dom, so it could have the highest z-index

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
      {!refs && modalRoot && (modalRoot instanceof Element) && createPortal(
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
      {refs &&
        <>
          <div className="modal" onClick={ev => ev.stopPropagation()} ref={refs} style={style}>
            {children}
          </div>
        </>}
    </>
  )
}