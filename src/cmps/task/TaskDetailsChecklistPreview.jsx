import { Progress } from "antd";
import { useState } from "react";
import { TaskDetailsChecklistItemList } from "./TaskDetailsChecklistItemList";

export function TaskDetailsChecklistPreview({ checklist }) {
	const totalItems = checklist.checkItems?.length || 0
	const [progress, setProgress] = useState(
		checklist.checkItems?.filter(checkedItem => checkedItem.checked).length / totalItems * 100
	)
	function onChangeProgress(completed) {
		setProgress(totalItems ? completed/totalItems*100 : 0)
	}
	return (
		<section className="task-details-checklist task-details-main-item" key={checklist.id}>
			<section className="task-details-main-item-header">
				<span className="icon icon-lg icon-checkbox-checked" />
				<h3>{checklist.title}</h3>
				<button className="btn">Delete</button>
			</section>
			<section className="task-details-checklist-progress">
				<Progress percent={progress} percentPosition={{ align: 'start', type: 'outer' }} format={percent => `${percent}%`} />
				<TaskDetailsChecklistItemList checklist={checklist} onChangeProgress={onChangeProgress} />
			</section>
		</section>
	)
}