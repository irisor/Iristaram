import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { IconContext } from "react-icons";
import { HiOutlinePlus } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";


export function CreateItem({ onAddItem, initialBtnLbl = 'Add', addBtnLabel = 'Add', placeholder = 'Enter title...', insideRef = null, groupId = null }) {
	const [newItem, setNewItem] = useState(null)
	const board = useSelector(storeState => storeState.boardModule.board)
	const inputRef = useRef(null)


	useEffect(() => {
		function handleClick(ev) {
			console.log("CreateItem event", ev)
			if (insideRef.current &&
				!insideRef.current.contains(ev.target)
			) {
				setNewItem(null)
			}
		}
		document.addEventListener("click", handleClick);
		return () => document.removeEventListener("click", handleClick);
	}, [insideRef])

	useEffect(() => {
		inputRef.current?.focus()
	}, [newItem])

	function onAddEmptyGroup(ev) {
		ev.stopPropagation()
		ev.preventDefault()
		setNewItem({ title: '' })
	}

	function onChangeTitle(title) {
		setNewItem({ ...newItem, title })
	}

	function handleAddItem(newItem, ev) {
		ev?.preventDefault()

		if (groupId) {
			// For tasks, include groupId
			onAddItem(board._id, groupId, newItem)
		} else {
			// For groups, omit groupId
			onAddItem(board._id, newItem)
		}

		setNewItem(null)
	}

	function onClose (ev) {
		ev.preventDefault()
		setNewItem(null)
	}

	return (
		<>
			{newItem &&
				(
					<form key="new-item" className="create-item edit">
						<textarea type="text"
							className="item-title-input"
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