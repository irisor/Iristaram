
import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { IconContext } from 'react-icons'
import { HiOutlinePlus } from 'react-icons/hi'
import { AiOutlineClose } from 'react-icons/ai'

export function CreateItem({ onAddItem, initialBtnLbl = 'Add', addBtnLabel = 'Add', placeholder = 'Enter title...', groupId = null }) {
	const [itemData, setItemData] = useState(null)
	const board = useSelector(storeState => storeState.boardModule.board)
	const inputRef = useRef(null)
	const insideRef = useRef(null)

	useEffect(() => {
		function handleClick(ev) {
			if (insideRef.current && !insideRef.current.contains(ev.target)) {
				if (inputRef?.current?.value?.length > 0) {
					handleAddItem({ title: inputRef.current.value }, ev)
				} else {
					setItemData(null)
				}
			}
		}
		document.removeEventListener('click', handleClick)
		document.addEventListener('click', handleClick)
		return () => document.removeEventListener('click', handleClick)
	}, [insideRef])

	useEffect(() => {
		inputRef.current?.focus()
	}, [itemData])

	function onAddEmptyItem(ev) {
		ev.stopPropagation()
		ev.preventDefault()
		setItemData({ title: '' })
	}

	function onChangeTitle(title) {
		setItemData(prevData => ({ ...prevData, title }))
	}

	function handleAddItem(newItem, ev = null) {
		console.log('handleAddItem', newItem)
		ev?.preventDefault()

		setItemData(null)
		
		if (groupId) {
			// For tasks, include groupId
			onAddItem(board._id, groupId, newItem)
		} else {
			// For groups, omit groupId
			onAddItem(board._id, newItem)
		}
	}

	function onClose(ev) {
		ev.preventDefault()
		setItemData(null)
	}

	return (
		<>
			{itemData ? (
				<form key="new-item" className="create-item edit" onSubmit={ev => handleAddItem(itemData, ev)} ref={insideRef}>
					<textarea
						type="text"
						className="editable-title-input"
						value={itemData.title}
						onChange={ev => onChangeTitle(ev.target.value)}
						onKeyDown={ev => ev.key === 'Enter' && handleAddItem(itemData)}
						placeholder={placeholder}
						ref={inputRef}
					/>
					<button className="btn new-item-save btn-blue" onClick={ev => handleAddItem(itemData, ev)}>
						{addBtnLabel}
					</button>
					<button className="btn icon new-item-close" onClick={ev => onClose(ev)}>
						<IconContext.Provider value={{ color: 'inherit' }}>
							<AiOutlineClose />
						</IconContext.Provider>
					</button>
				</form>
			) : (
				<button className="btn create-item non-edit" onClick={ev => onAddEmptyItem(ev)}>
					<div className="icon">
						<HiOutlinePlus />
					</div>
					{initialBtnLbl}
				</button>
			)}
		</>
	);
}
