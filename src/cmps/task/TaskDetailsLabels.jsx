import { Popover } from "antd"
import { useEffect } from "react"
import { MenuCarousel } from "../menuCarousel/MenuCarousel"
import { TaskLabelsMenu } from "./TaskLabelsMenu"
import { useMultiPopover } from "../../customHooks/useMultiPopover"

export function TaskDetailsLabels({ task }) {

	const LabelsMenuComponents = {
		labels: { component: TaskLabelsMenu, title: 'Labels' },
	}

	const { openPopover, closePopover, isPopoverOpen } = useMultiPopover()

	useEffect(() => {
	}, [task?.labels])

	return (
		<section className="task-details-labels task-details-data-item">
			<h3 className="task-details-labels-title task-details-data-item-title">Labels</h3>
			<section className="task-details-labels-label-list task-details-data-item-content">
				{task.labels?.map(label =>
					<Popover key={label.id} content={props => MenuCarousel({ ...props, menuComponents: LabelsMenuComponents, onClose: closePopover })}
						open={isPopoverOpen(`popover-label${label.id}-${task.id}`)}
						onOpenChange={(open) => (open ? openPopover(`popover-label${label.id}-${task.id}`) : closePopover())}
						placement="center" trigger={"click"} arrow={false}>
						<button className="btn task-details-labels-label" style={{ backgroundColor: label.color }}>
							{label.title}
						</button>
					</Popover>
				)}
				<Popover content={props => MenuCarousel({ ...props, menuComponents: LabelsMenuComponents, onClose: closePopover })}
					open={isPopoverOpen(`popover-add-label${task.id}`)}
					onOpenChange={(open) => (open ? openPopover(`popover-add-label${task.id}`) : closePopover())}
					placement="center" trigger={"click"} arrow={false}>
					<button className="btn task-details-labels-add-label">
						<span className="icon icon-sm icon-add"></span>
					</button>
				</Popover>
			</section>
		</section>
	)
}