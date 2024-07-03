import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { EditableTitle } from './EditableTitle'
export function GroupPreview({ group, onRemoveGroup, onUpdateGroupTitle }) {
	const board = useSelector(storeState => storeState.boardModule.board)

	return (

		<section key={group.id} className="group-preview">
			<div className="group-title">
				<EditableTitle
					initialTitle={group.title}
					onUpdateTitle={(title) => onUpdateGroupTitle(group, title)}
				/>
			</div>
			{group?.tasks?.map(task =>
				<article key={task.id} className="task">
					<Link to={`group/${group.id}/task/${task.id}`}>
						<h4>{task.title}</h4>
					</Link>
					<p>
						Status: {task.status} | Due: {task.dueDate}
						| MemberIds: {task.memberIds?.join()}
					</p>
				</article>
			)}
			<button className="btn" onClick={() => { onRemoveGroup(board._id, group?.id) }}>X</button>
		</section>
	)
}