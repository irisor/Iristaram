import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { EditableTitle } from './EditableTitle'
import {TaskList} from './TaskList'
export function GroupPreview({ group, onRemoveGroup, onUpdateGroupTitle, taskProps }) {
	const board = useSelector(storeState => storeState.boardModule.board)

	return (

		<section key={group.id} className="group-preview">
			<div className="group-title">
				<EditableTitle
					initialTitle={group.title}
					onUpdateTitle={(title) => onUpdateGroupTitle(group, title)}
				/>
			</div>
			<TaskList
				props={{groupId: group.id, ...taskProps}}
			/>
			<button className="btn" onClick={() => { onRemoveGroup(board._id, group?.id) }}>X</button>
		</section>
	)
}