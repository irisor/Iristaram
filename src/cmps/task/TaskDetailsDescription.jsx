import { useState, useRef, useEffect } from "react"
import { useClickOutside } from "../../customHooks/useClickOutside";

export function TaskDetailsDescription({ task, onUpdateTask }) {
	const [isEditing, setIsEditing] = useState(false)
	const [descValue, setDescValue] = useState(task.description)
	const [tempValue, setTempValue] = useState(task.description)
	const mainRef = useRef()
	const inputRef = useRef()


	useEffect(() => {
		if (isEditing) {
		  inputRef.current.select()
		}
	  }, [isEditing])

	useClickOutside((event) => onClose(event), mainRef);

	function handleClickDesc(){
		setIsEditing(true);
	}

	function onClose(ev){
		console.log("onClose: descValue", descValue, "tempValue", tempValue)
		// ev?.stopPropagation()
		// ev?.preventDefault()
		setIsEditing(false)
	}

	async function onSave(ev = null){
		ev?.stopPropagation()
		ev?.preventDefault()
		setDescValue(tempValue)
		await onUpdateTask({...task, description: tempValue})
		setIsEditing(false)
	}

	return (
		<section className="task-details-description task-details-main-item" ref={mainRef}>
			<section className="task-details-main-item-header">
				<span className="icon icon-lg icon-description" />
				<h3>Description</h3>
				{descValue && <button className="btn" onClick={handleClickDesc}>Edit</button>}
			</section>
			<section className="task-details-main-item-content">
			{ isEditing ? (<>
				<textarea className='task-details-description-edit'
				type="text"
				value={tempValue}
				onChange={(ev) => {setTempValue(ev.target.value), console.log(ev.target.value)}}
				ref={inputRef}
				/> 
				<section className="task-details-description-button-container" style={{display:"flex", gap:"10px"}}>
				<button className="btn new-item-save btn-color-bold blue" onClick={(ev) => onSave(ev)}>
				Save
			</button>
			<button className="btn" onClick={ev => onClose(ev)}>
				Cancel
			</button>
			</section>
				</>)
				 :
				  (descValue ? <p onClick={handleClickDesc}>{descValue}</p> : 
					<a className="task-details-description-add btn" href="#" onClick={handleClickDesc}>Add a more detailed description...</a>
				  )}
				
				{/* {!descValue && <a className="task-details-description-add btn" href="#" onClick={handleClickDesc}>Add a more detailed description...</a>} */}
			</section>
		</section>
	)
}