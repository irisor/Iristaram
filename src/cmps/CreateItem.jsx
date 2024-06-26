import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

export function CreateItem({ onAddItem, initialBtnLbl = 'Add', addBtnLabel = 'Add', className = '', insideRef = null }) {
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

	function handleAddItem(boardId, newItem) {
		onAddItem(boardId, newItem)
		setNewItem(null)
	}

	return (
		<>
			{newItem &&
				(
					<section key='new-item' className={className}>
						<h2 className="item-title">{newItem?.title} - new</h2>
						<input type="text" 
							value={newItem.title} 
							onChange={ev => onChangeTitle(ev.target.value)}
							onKeyDown={ev => ev.key === 'Enter' && handleAddItem(board?._id, newItem)}
							ref={inputRef}
						/>
						<button onClick={() => { handleAddItem(board?._id, newItem) }}>{addBtnLabel}</button>
					</section>
				)
			}
			{!newItem && <button onClick={ ev => { onAddEmptyGroup(ev) }}>{initialBtnLbl}</button>}
		</>
	)
}