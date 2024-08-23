import { Progress } from "antd";
import { useEffect, useRef, useState } from "react";
import { TaskDetailsChecklistItemList } from "./TaskDetailsChecklistItemList";
import { useParams } from "react-router";
import { shallowEqual, useSelector } from "react-redux";
import { updateTask } from "../../store/board/board.actions";
import { CreateItem } from "../general/CreateItem";
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service";
import { utilService } from "../../services/util.service";

export function TaskDetailsChecklistPreview({ checklist }) {
	// const totalItems = checklist.checkItems?.length || 0
	// const completedItems = checklist.checkItems?.filter(checkedItem => checkedItem.checked).length
	const [totalItems, setTotalItems] = useState(0)
	const [completedItems, setCompletedItems] = useState(0)
	const [progress, setProgress] = useState(completedItems / totalItems * 100)
	const [hideCompleted, setHideCompleted] = useState(false)
	const [hideCompletedText, setHideCompletedText] = useState('Hide checked items')
	const { taskId } = useParams();
	const memoizedSelector = (storeState) => {
		const board = storeState.boardModule.board
		const group = board.groups.find(g => g.tasks.some(t => t.id === taskId))
		const task = group?.tasks.find(t => t.id === taskId)
		return { board, currentTask: task, groupId: group?.id }
	}

	const { board, currentTask, groupId } = useSelector(memoizedSelector, shallowEqual)

	useEffect(() => {
		setTotalItems(checklist.checkItems?.length || 0)
		setCompletedItems(checklist.checkItems?.filter(checkedItem => checkedItem.checked).length)
	}, [checklist])
	
	useEffect(() => {
		setProgress(totalItems ? Math.round(completedItems / totalItems * 100) : 0)
	}, [totalItems, completedItems])


	useEffect(() => {
		setHideCompletedText(hideCompleted ? `Show checked items (${completedItems})` : `Hide checked items`)
	}, [hideCompleted])

	async function deleteChecklist() {
		await updateTask(board._id, groupId, { ...currentTask, checklists: currentTask.checklists.filter(checklist => checklist.id !== checklist.id) })
	}

	function onAddCheckItem(boardId, groupId) {
		return function (checkItemTitle) {
			if (!checkItemTitle) return
			try {
				const newCheckItem = {
					id: utilService.makeId(),
					title: checkItemTitle,
					checked: false
				}
				updateTask(boardId, groupId, {
					...currentTask, checklists: currentTask.checklists.map(cl => {
						if (cl.id === checklist.id) return { ...checklist, checkItems: [...checklist.checkItems, newCheckItem] }
						return cl
					})
				})
				showSuccessMsg(`Checklist item added`)
			} catch (err) {
				showErrorMsg('Cannot add checklist item')
			}
		}
	}

	return (
		<section className="task-details-checklist task-details-main-item" key={checklist.id}>
			<section className="task-details-main-item-header">
				<span className="icon icon-lg icon-checkbox-checked" />
				<h3>{checklist.title}</h3>
				{completedItems > 0 && <button className="btn" onClick={() => setHideCompleted(!hideCompleted)}>{hideCompletedText}</button>}
				<button className="btn" onClick={deleteChecklist}>Delete</button>
			</section>
			<section className="task-details-checklist-progress">
				<Progress percent={progress} percentPosition={{ align: 'start', type: 'outer' }} format={percent => `${percent}%`} />
			</section>
			<TaskDetailsChecklistItemList checklist={checklist} hideCompleted={hideCompleted} />
			<CreateItem onAddItem={onAddCheckItem(board._id, groupId)} initialBtnLbl='Add an item' addBtnLabel='Add' placeholder='Add an item' closeWithBtnOnly={true} />
		</section>
	)
}