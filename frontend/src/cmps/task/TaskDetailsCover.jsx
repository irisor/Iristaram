export function TaskDetailsCover ({ task }) {
	return (
		<>
			{task?.cover?.url && (
				<section className='task-details-cover'>
					<img className='task-details-cover-img' src={task.cover?.url} alt="cover" />
					<div className="task-details-cover-menu">
						<button className="btn task-details-cover-menu-item">
							<span className="icon icon-sm icon-card-cover"></span>
							&nbsp;Cover
						</button>
					</div>
				</section>
			)}
		</>
	)
}
