export function TaskDetailsActivities({ task }) {
	return (
		<section className="task-details-main-item task-details-activities">
			<section className="task-details-main-item-header">
				<span className="icon icon-lg icon-activity"></span>
				<h3>Activity</h3>
				<button className="btn">Hide Details</button>
			</section>
			<section className="task-details-main-item-content">
				<article className="task-details-activity-item">
					<div className="task-details-activity-item-desc">some activity</div>
					<div className="task-details-activity-item-time">Jul 14, 2024, 9:33 PM</div>
				</article>
			</section>
		</section>
	)
}