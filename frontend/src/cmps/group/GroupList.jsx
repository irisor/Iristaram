import { useSelector } from 'react-redux'

import { GroupPreview } from './GroupPreview'
import { CreateItem } from '../general/CreateItem'

export function GroupList({ onRemoveGroup, onUpdateGroupTitle, onAddGroup, taskProps, onDragStart,  onDragDrop }) {
	const board = useSelector(storeState => storeState.boardModule.board)

	return (
		<section className="group-list">
			{board?.groups?.map(group =>
				<GroupPreview 
				key={group.id} 
				group={group} 
				onRemoveGroup={onRemoveGroup} 
				onUpdateGroupTitle={onUpdateGroupTitle} 
				onDragStart={onDragStart} 
				onDragDrop={onDragDrop}
				taskProps={taskProps} />
			)}

			<CreateItem onAddItem={onAddGroup} initialBtnLabel='Add another list' addBtnLabel='Add list' placeholder='Enter list title...' />

		</section >
	)
}
