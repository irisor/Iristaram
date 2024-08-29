import { Popover } from "antd"
import { useEffect } from "react"
import { TaskLabelsMenu } from "./TaskLabelsMenu"
import { useMultiPopover } from "../../customHooks/useMultiPopover"

export function TaskDetailsLabels({ task }) {

	const { openPopover, closePopover, isPopoverOpen } = useMultiPopover()

	useEffect(() => {
	}, [task?.labels])

	return (
		<>
			{task.labels && task.labels.length > 0 &&
				<section className="task-details-labels task-details-data-item">
					<h3 className="task-details-labels-title task-details-data-item-title">Labels</h3>
					<section className="task-details-labels-label-list task-details-data-item-content">
						{task.labels?.map(label =>
							<Popover key={label.id} content={props => TaskLabelsMenu({ ...props, onClose: closePopover })}
								open={isPopoverOpen(`popover-labels${label.id}-${task.id}`)}
								onOpenChange={(open) => (open ? openPopover(`popover-labels${label.id}-${task.id}`) : closePopover())}
								placement="bottomLeft" trigger={"click"} arrow={false}>
								<button className="btn task-details-labels-label" style={{ backgroundColor: label.color, color: label.textColor }}>
									{label.title}
								</button>
							</Popover>
						)}
						<Popover content={props => TaskLabelsMenu({ ...props, onClose: closePopover })}
							open={isPopoverOpen(`popover-add-label${task.id}`)}
							onOpenChange={(open) => (open ? openPopover(`popover-add-label${task.id}`) : closePopover())}
							placement="bottomLeft" trigger={"click"} arrow={false}>
							<button className="btn task-details-labels-add-label">
								<span className="icon icon-sm icon-add"></span>
							</button>
						</Popover>
					</section>
				</section>
			}
		</>
	)
}