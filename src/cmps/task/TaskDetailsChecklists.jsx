import { TaskDetailsChecklistPreview } from "./TaskDetailsChecklistPreview";

export function TaskDetailsChecklists({ task }) {

	return (
		<>
			{
				task.checklists?.map(checklist => (
					<TaskDetailsChecklistPreview checklist={checklist} key={checklist.id} />
				))
			}
		</>
	)
}