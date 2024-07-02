import { useSelector } from 'react-redux'

import { GroupPreview } from './GroupPreview'
import { CreateItem } from './CreateItem'

export function GroupList({ onRemoveGroup, onUpdateTitle, onAddGroup }) {
	const board = useSelector(storeState => storeState.boardModule.board)

	return (
		<section className="group-list">
			{board?.groups?.map(group =>
				<GroupPreview key={group.id} group={group} onRemoveGroup={onRemoveGroup} onUpdateTitle={onUpdateTitle} />
			)}

			<CreateItem onAddItem={onAddGroup} initialBtnLbl='Add another list' addBtnLabel='Add list' placeholder='Enter list title...' />

		</section >
	)
}
