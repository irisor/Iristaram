// import { useSelector } from 'react-redux'
import { EditableTitle } from '../general/EditableTitle'
import {TaskList} from '../task/TaskList'
export function GroupPreview({ group, onUpdateGroupTitle, taskProps }) {

	return (

		<section key={group.id} className="group-preview">
			<div className="group-title">
				<EditableTitle
					initialTitle={group.title}
					onUpdateTitle={(title) => onUpdateGroupTitle(group, title)}
				/>
			</div>
			<TaskList
				props={{...taskProps, groupId: group.id}}
			/>
			{/* <button className="btn" onClick={() => { onRemoveGroup(board._id, group?.id) }}>X</button> */}
		</section>
	)
}