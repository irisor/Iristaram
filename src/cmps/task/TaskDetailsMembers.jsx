export function TaskDetailsMembers ({ task }) {
	return (
		<section className="task-details-members task-details-data-item">
			<h3 className="task-details-members-title task-details-data-item-title">Members</h3>
			<section className="task-details-members-member-list task-details-data-item-content">
				{task.memberIds?.map(member =>
					<button className="btn task-details-members-member" key={member}>
						<img className="avatar" src="../../src/assets/img/member.png" alt="avatar" width="32" height="32" />
					</button>
				)}
				<button className="btn task-details-members-add-member">
					<span className="icon icon-sm icon-add"></span>
				</button>
			</section>
		</section>
	)
}
