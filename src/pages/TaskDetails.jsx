import { Modal } from "../cmps/Modal"
import { useNavigate, useParams } from "react-router"
import { useModal } from "../customHooks/useModal"
import { useEffect } from "react"

export function TaskDetails() {
    const { boardId, taskId } = useParams()
    const { isOpen, openModal, closeModal } = useModal()
    const navigate = useNavigate()


    useEffect(() => {
        openModal()
    }, [taskId])

    function onClose(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        closeModal()
        navigate("..")
    }

    return (
        // <div className='task-details task-modal' ref={refs.setReference}>
        <Modal isOpen={isOpen} closeModal={ev => onClose(ev)} cmpClassName='task-details'>
            TaskDetails
        </Modal>
    )
}