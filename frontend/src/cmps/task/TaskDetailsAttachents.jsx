export function TaskDetailsAttachents({ task }) {
	return (
		<>
			{task?.attachments?.length > 0 && (
				<section className="task-details-main-item task-details-attachments">
					<section className="task-details-main-item-header">
						<span className="icon icon-lg icon-attachment" />
						<h3>Attachments</h3>
						<button className="btn">Add</button>
					</section>
					<section className="task-details-main-item-content">
						{task?.attachments?.map((attachment) => {
							const attachmentName = attachment.url?.split('/').pop().split('?')[0];
							return (
								<article key={attachment._id} className="task-details-attachments-attachment-item">
									<a className="task-details-attachments-attachment-thumbnail-preview" href="#">
										<img className="task-details-attachments-attachment-thumbnail-img" src={attachment.url} alt={attachmentName} width="112" height="80" />
									</a>
									<section className="task-details-attachments-attachment-thumbnail-details">
										<span className="task-details-attachments-attachment-thumbnail-details-first-line">
											<a href="#" className="task-details-attachments-attachment-thumbnail-name">{attachmentName}</a>
											<span className="icon icon-sm icon-external-link"></span>
										</span>
										<span className="task-details-attachments-attachment-thumbnail-details-second-line">
											<span className="task-details-attachments-attachment-thumbnail-option">Added 3 hours ago</span>

											<span className="task-details-attachments-attachment-thumbnail-option"><a href="#">Comment</a></span>
											<span className="task-details-attachments-ttachment-thumbnail-option"><a href="#">Download</a></span>
											<span className="task-details-attachments-attachment-thumbnail-option"><a href="#">Delete</a></span>
											<span className="task-details-attachments-attachment-thumbnail-option"><a href="#">Edit</a></span>
										</span>
										<span className="task-details-attachments-attachment-thumbnail-details-third-line">
											<span className="task-details-attachments-attachment-thumbnail-option">
												<span className="icon icon-sm icon-card-cover"></span>
												{task.cover?.attachmentId === attachment._id ? <a href="#">Remove cover</a> : <a href="#">Make cover</a>}
											</span>
										</span>
									</section>
								</article>
							)
						})}
					</section>
				</section>
			)}
		</>
	)
}