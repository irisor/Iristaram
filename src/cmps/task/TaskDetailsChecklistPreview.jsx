import { Progress } from "antd";
import { useEffect, useRef, useState } from "react";
import { TaskDetailsChecklistItemList } from "./TaskDetailsChecklistItemList";
import { useParams } from "react-router";
import { shallowEqual, useSelector } from "react-redux";
import { updateTask } from "../../store/board/board.actions";

export function TaskDetailsChecklistPreview({ checklist }) {
	const totalItems = checklist.checkItems?.length || 0
	const completedItems = checklist.checkItems?.filter(checkedItem => checkedItem.checked).length
	const [ progress, setProgress ] = useState(completedItems / totalItems * 100)
	const [ hideCompleted, setHideCompleted ] = useState(false)
	const hideCompletedText = useRef('Hide checked items')
	const { taskId } = useParams();
	const memoizedSelector = (storeState) => {
        const board = storeState.boardModule.board
        const group = board.groups.find(g => g.tasks.some(t => t.id === taskId))
        const task = group?.tasks.find(t => t.id === taskId)
        return { board, currentTask: task, groupId: group?.id }
    }

	const { board, currentTask, groupId } = useSelector(memoizedSelector, shallowEqual)

	useEffect(() => {
		if (hideCompleted) {
			hideCompletedText.current = `Hide checked items`
		} else {
			hideCompletedText.current = `Show checked items (${completedItems})`
		}
	}, [hideCompleted])

	function onChangeProgress(completed) {
		setProgress(totalItems ? completed / totalItems * 100 : 0)
	}

	function deleteChecklist() {
		updateTask(board._id, groupId, { ...currentTask, checklists: currentTask.checklists.filter(checklist => checklist.id !== checklist.id) })
	}

	return (
		<section className="task-details-checklist task-details-main-item" key={checklist.id}>
			<section className="task-details-main-item-header">
				<span className="icon icon-lg icon-checkbox-checked" />
				<h3>{checklist.title}</h3>
				{completedItems > 0 && <button className="btn" onClick={() => setHideCompleted(!hideCompleted)}>{hideCompletedText.current}</button>}
				<button className="btn" onClick={deleteChecklist}>Delete</button>
			</section>
			<section className="task-details-checklist-progress">
				<Progress percent={progress} percentPosition={{ align: 'start', type: 'outer' }} format={percent => `${percent}%`} />
			</section>
			<TaskDetailsChecklistItemList checklist={checklist} onChangeProgress={onChangeProgress} hideCompleted={hideCompleted} />
		</section>
	)
}