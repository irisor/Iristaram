import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { EditableTitle } from './EditableTitle'
export function GroupPreview({ group, onRemoveGroup, onUpdateTitle }) {
	const board = useSelector(storeState => storeState.boardModule.board)

	return (

		<section key={group.id} className="group">
			<h2 className="group-title">
				{console.log("before EditableTitle", group.title)}
				<EditableTitle
					initialTitle={group.title}
					onUpdateTitle={(title) => onUpdateTitle(group, title)}
				/>
			</h2>
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
			<button onClick={() => { onRemoveGroup(board._id, group?.id) }}>X</button>
		</section>
	)
}