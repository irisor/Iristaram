export function TaskDetailsDescription({ task }) {
	return (
		<section className="task-details-description task-details-main-item">
			<section className="task-details-main-item-header">
				<span className="icon icon-lg icon-description" />
				<h3>Description</h3>
				{task?.description && <button className="btn">Edit</button>}
			</section>
			<section className="task-details-main-item-content">
				{task?.description && <p>{task.description}</p>}
				{!task?.description && <a className="task-details-description-add btn" href="#">Add a more detailed description...</a>}
			</section>
		</section>
	)
}