import React, { useEffect } from "react";
import { useForm } from "../../customHooks/useForm";
import { TaskDetailsChecklistItemPreview } from "./TaskDetailsChecklistItemPreview";
import { updateTask } from "../../store/board/board.actions";
import { shallowEqual, useSelector } from "react-redux";
import { useParams } from "react-router";

export function TaskDetailsChecklistItemList({ checklist, hideCompleted }) {
	const { taskId } = useParams();
	const memoizedSelector = (storeState) => {
		const board = storeState.boardModule.board
		const group = board.groups.find(g => g.tasks.some(t => t.id === taskId))
		const task = group?.tasks.find(t => t.id === taskId)
		return { board, currentTask: task, groupId: group?.id }
	}

	const { board, currentTask, groupId } = useSelector(memoizedSelector, shallowEqual)

	const initialChecklistForm = checklist.checkItems.reduce((acc, checkItem) => {
		return { ...acc, [checkItem.id]: checkItem.checked }
	}, {})

	const [checklistForm, setChecklistForm, handleChange, resetForm] = useForm(initialChecklistForm)

	useEffect(() => {
		if (JSON.stringify(checklistForm) !== JSON.stringify(initialChecklistForm)) {
			const newTask = {
				...currentTask, checklists: currentTask.checklists.map(newChecklist => {
					if (newChecklist.id === checklist.id) return { ...checklist, checkItems: newChecklist.checkItems.map(checkItem => ({ ...checkItem, checked: checklistForm[checkItem.id] })) }
					return checklist
				})
			}
			updateTask(board._id, groupId, newTask)
		}
	}, [checklistForm])

	function onChange(ev) {
		handleChange(ev)
	}

	return (
		<form onSubmit={ev => ev.preventDefault()} className="task-details-checklist-list" >
			{checklist.checkItems.map(checkItem =>
				<React.Fragment key={checkItem.id}>
					{hideCompleted && checkItem.checked ? null : <TaskDetailsChecklistItemPreview key={checkItem.id} checkItem={checkItem} onChange={ev => onChange(ev)}/>}
				</React.Fragment>
			)}
		</form>
	)
}