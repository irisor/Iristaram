export function TaskDetailsNotifications({ task }) {
	return (
		<section className="task-details-notifications task-details-data-item">
			<h3 className="task-details-notifications-title task-details-data-item-title">Notifications</h3>
			<button className="btn task-details-notifications-btn task-details-data-item-content">
				<span className="icon icon-sm icon-subscribe"></span>
				<p>Watch</p>
			</button>
		</section>
	)
}