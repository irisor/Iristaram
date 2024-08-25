import { useState } from "react";
import { TaskDetailsChecklistPreview } from "./TaskDetailsChecklistPreview";

export function TaskDetailsChecklists({ task }) {
	function triggerResetAll({ except }) {
		setResetAll(prevState => ({reset: true, except}))
	}

	const [resetAll, setResetAll] = useState({reset: false, except: null})


	return (
		<>
			{
				task.checklists?.map(checklist => (
					<TaskDetailsChecklistPreview checklist={checklist} key={checklist.id} resetAll={resetAll} triggerResetAll={triggerResetAll}/>
				))
			}
		</>
	)
}