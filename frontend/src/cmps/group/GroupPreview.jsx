// import { useSelector } from 'react-redux'
import { EditableTitle } from '../general/EditableTitle'
import {TaskList} from '../task/TaskList'
export function GroupPreview({ group, onUpdateGroupTitle, taskProps, onDragStart, onDragDrop }) {

    function handleDragDrop(ev) {
        onDragDrop(ev, group.id)
    }


	return (

		<section key={group.id} className="group-preview" onDrop={ev => handleDragDrop(ev)}>
			<div className="group-title">
				<EditableTitle
					initialTitle={group.title}
					onUpdateTitle={(title) => onUpdateGroupTitle(group, title)}
				/>
			</div>
			<TaskList
				props={{...taskProps, groupId: group.id, onDragStart}}
			/>
		</section>
	)
}