
import { useState, useEffect, useRef } from 'react'
import { useClickOutside } from '../../customHooks/useClickOutside'

export function CreateItem({
	onAddItem, onInput = () => { }, initialBtnLabel = 'Add',
	addBtnLabel = 'Add', placeholder = 'Enter title...', closeWithBtnOnly = false, closeBtnLabel = null
}) {
	const [itemData, setItemData] = useState(null)
	const inputRef = useRef(null)
	const clickOutsideRef = useRef(null)

	useClickOutside(onClose, clickOutsideRef)

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

	async function handleAddItem(newItem, ev = null) {
		ev?.preventDefault()
		ev?.stopPropagation()

		const addItemFunction = await onAddItem
		await addItemFunction(newItem.title)

		// Reset itemData after a short delay to avoid displaying an empty item form when pressing enter
		setTimeout(() => {
			setItemData({ title: '' })
		}, 0)
	}

	function onClose(ev) {
		ev.preventDefault()
		if (!closeWithBtnOnly) setItemData(null)
	}

	function onCloseBtn(ev) {
		ev.preventDefault()
		setItemData(null)
	}

	return (
		<>
			{itemData ? (
				<>
					<form key="new-item" className="create-item edit" ref={clickOutsideRef}>
						<textarea
							type="text"
							className="editable-title-input"
							value={itemData.title}
							onChange={ev => onChangeTitle(ev.target.value)}
							onKeyDown={ev => ev.key === 'Enter' && handleAddItem(itemData)}
							placeholder={placeholder}
							ref={inputRef}
							onInput={ev => onInput(ev)}
						/>
						<button className="btn new-item-save btn-color-bold blue" onClick={ev => handleAddItem(itemData, ev)}>
							{addBtnLabel}
						</button>
						<button className="btn icon new-item-close" onClick={ev => onCloseBtn(ev)}>
							{ closeBtnLabel ? closeBtnLabel : <span className="icon icon-md icon-close" /> }
						</button>
					</form>
				</>
			) : (
				<button className="btn create-item non-edit " onClick={ev => onAddEmptyItem(ev)}>
					<div className="icon add-item">
						<span className="icon icon-md icon-add" />
					</div>
					{initialBtnLabel}
				</button>
			)}
		</>
	);
}
