
import { useState, useEffect, useRef } from 'react'
import { useClickOutside } from '../../customHooks/useClickOutside'
import { useSelector } from 'react-redux'
import { setOpenCreateItem } from '../../store/general/general.actions'
import { useResizeInput } from '../../customHooks/useResizeInput'

export function CreateItem({
	onAddItem, initialBtnLabel = 'Add',
	addBtnLabel = 'Add', placeholder = 'Enter title...', closeWithBtnOnly = false, closeBtnLabel = null,
	triggerResetAll=null , resetAll=false, thisId=null
}) {
	const [ itemData, setItemData ] = useState(null)
	const inputRef = useRef(null)
	const clickOutsideRef = useRef(null)
	const openCreateItem = useSelector(storeState => storeState.generalModule.openCreateItem)
	const { resizeInput } = useResizeInput(inputRef)

	useClickOutside(onClose, clickOutsideRef)

	useEffect(() => {
		inputRef.current?.focus()
		resizeInput()
	}, [itemData])

	useEffect(() => {
		if (resetAll?.reset && resetAll?.except !== thisId) {
			setItemData(null)
		}
	}, [resetAll])

	useEffect(() => {
		if (openCreateItem) {
			if (openCreateItem === thisId) {
				setItemData({ title: '' })
				if (triggerResetAll) triggerResetAll({ except: thisId })
				setOpenCreateItem(null)
			}
		}
	}, [openCreateItem])

	function onAddEmptyItem(ev) {
		ev.stopPropagation()
		ev.preventDefault()
		setItemData({ title: '' })
		if (triggerResetAll) triggerResetAll({ except: thisId })
		setOpenCreateItem(null)
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

	function handleInputClick() {
		inputRef.current?.focus()
	}

	function handleInput() {
		resizeInput()
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
							onInput={ev => handleInput(ev)}
							onClick={handleInputClick}
						/>
						<button className="btn new-item-save btn-color-bold blue" onClick={ev => handleAddItem(itemData, ev)}>
							{addBtnLabel}
						</button>
						<button className="btn icon new-item-close" onClick={ev => onCloseBtn(ev)}>
							{closeBtnLabel ? closeBtnLabel : <span className="icon icon-md icon-close" />}
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
