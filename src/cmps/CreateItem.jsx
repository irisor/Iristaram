import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { IconContext } from "react-icons";
import { HiOutlinePlus } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";


export function CreateItem({ onAddItem, initialBtnLbl = 'Add', addBtnLabel = 'Add', placeholder = 'Enter title...', groupId = null }) {
	const [newItem, setNewItem] = useState(null)
	const board = useSelector(storeState => storeState.boardModule.board)
	const inputRef = useRef(null)
	const insideRef = useRef(null)


	useEffect(() => {
		function handleClick(ev) {
			if (insideRef.current &&
				!insideRef.current.contains(ev.target)
			) {
				if (inputRef.current?.value?.length > 0) {
					handleAddItem({title: inputRef.current?.value}, ev)
				} else {
					setNewItem(() => null)
				}
			}
		}
		document.addEventListener("click", handleClick);
		return () => document.removeEventListener("click", handleClick);
	}, [insideRef])

	useEffect(() => {
		console.log('onChangeTitle useEffect', newItem)
		inputRef.current?.focus()
	}, [newItem])

	function onAddEmptyGroup(ev) {
		ev.stopPropagation()
		ev.preventDefault()
		setNewItem(() => (() => { title: '' }))
	}

	function onChangeTitle(title) {
		setNewItem(prevItem => ({ ...prevItem, title }))
	}

	function handleAddItem(newItem, ev = null) {
		ev?.preventDefault()

		if (groupId) {
			// For tasks, include groupId
			onAddItem(groupId, newItem.title)
		} else {
			// For groups, omit groupId
			onAddItem(board._id, newItem)
		}	

		setNewItem(() => null)
	}

	function onClose(ev) {
		ev.preventDefault()
		setNewItem(() => null)
	}

	return (
		<>
			{newItem &&
				(
					<form key="new-item" className="create-item edit" onSubmit={ev => { handleAddItem(newItem, ev) }} ref={insideRef}>
						<textarea type="text"
							className="editable-title-input"
							value={newItem.title}
							onChange={ev => onChangeTitle(ev.target.value)}
							onKeyDown={ev => ev.key === 'Enter' && handleAddItem(newItem)}
							placeholder={placeholder}
							ref={inputRef}
						/>
						<button className="btn new-item-save btn-blue" onClick={ev => { handleAddItem(newItem, ev) }}>{addBtnLabel}</button>
						<button className="btn icon new-item-close" onClick={ev => { onClose(ev) }}>
							<IconContext.Provider value={{ color: 'inherit' }}>
								<AiOutlineClose />
							</IconContext.Provider>
						</button>
					</form>
				)
			}
			{!newItem && <button className="btn create-item non-edit" onClick={ev => { onAddEmptyGroup(ev) }}>
				<div className="icon">
					<HiOutlinePlus />
				</div>
				{initialBtnLbl}
			</button>}
		</>
	)
}