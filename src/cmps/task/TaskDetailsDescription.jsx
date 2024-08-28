import { useState, useRef, useEffect } from "react"
import { useResizeInput } from "../../customHooks/useResizeInput"

export function TaskDetailsDescription({ task, onUpdateTask }) {
	const [isEditing, setIsEditing] = useState(false)
	const [descValue, setDescValue] = useState(task.description)
	const [tempValue, setTempValue] = useState(task.description)
	const inputRef = useRef()
	const { resizeInput } = useResizeInput(inputRef)


	useEffect(() => {
		if (isEditing) {
			resizeInput()
		}
	}, [isEditing])

	function handleClickDesc() {
		setIsEditing(true)
	}

	function onClose() {
		setIsEditing(false)
		setTempValue(descValue)
	}

	async function onSave(ev = null) {
		ev?.stopPropagation()
		ev?.preventDefault()
		setDescValue(tempValue)
		await onUpdateTask({ ...task, description: tempValue })
		setIsEditing(false)
	}

	return (
		<section className="task-details-description task-details-main-item">
			<section className="task-details-main-item-header">
				<span className="icon icon-lg icon-description" />
				<h3>Description</h3>
				{descValue && <button className="btn" onClick={handleClickDesc}>Edit</button>}
			</section>
			<section className="task-details-main-item-content">
				{isEditing ? (<>
					<textarea className='task-details-description-edit'
						type="text"
						value={tempValue}
						onChange={(ev) => setTempValue(ev.target.value)}
						ref={inputRef}
						onInput={resizeInput}
					/>
					<section className="task-details-description-button-container">
						<button className="btn new-item-save btn-color-bold blue" onClick={(ev) => onSave(ev)}>
							Save
						</button>
						<button className="btn" onClick={onClose}>
							Cancel
						</button>
					</section>
				</>)
					:
					(descValue ? (
						<div 
							dangerouslySetInnerHTML={{ __html: descValue.replace(/(?:\r\n|\r|\n)/g, '<br>') }}
							onClick={handleClickDesc}
						/>) :
						<a className="task-details-description-add btn" href="#" onClick={handleClickDesc}>Add a more detailed description...</a>
					)}
			</section>
		</section>
	)
}