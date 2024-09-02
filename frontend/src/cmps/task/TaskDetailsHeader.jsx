import { EditableTitle } from "../general/EditableTitle"


export function TaskDetailsHeader ({ task, groupTitle, onUpdateTaskTitle }) {
	return (
		<section className='task-details-header'>
			<div className="task-details-header-icon icon icon-lg icon-card"></div>
			<EditableTitle className="task-details-header-title" initialTitle={task.title} onUpdateTitle={title => onUpdateTaskTitle(title)} />
			<div className="task-details-header-in-list">In list <a href="#">{groupTitle}</a></div>
		</section>
	)
}
