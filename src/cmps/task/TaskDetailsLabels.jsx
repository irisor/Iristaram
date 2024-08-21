import { useEffect } from "react"

export function TaskDetailsLabels ({ task }) {
	console.log('TaskDetailsLabels task.labels', task.labels)

	useEffect(() => {
	}, [task?.labels])

	return (
		<section className="task-details-labels task-details-data-item">
			<h3 className="task-details-labels-title task-details-data-item-title">Labels</h3>
			<section className="task-details-labels-label-list task-details-data-item-content">
				{task.labels?.map(label =>
					<button className="btn task-details-labels-label" key={label.id}>
						{label.title}
					</button>
				)}
				<button className="btn task-details-labels-add-label">
					<span className="icon icon-sm icon-add"></span>
				</button>
			</section>
		</section>
	)
}