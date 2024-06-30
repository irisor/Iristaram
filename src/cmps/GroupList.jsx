import { useSelector } from 'react-redux'
import { useRef } from 'react'

import { GroupPreview } from './GroupPreview'
import { CreateItem } from './CreateItem'

export function GroupList({ onRemoveGroup, onUpdateTitle, onAddGroup }) {
	const board = useSelector(storeState => storeState.boardModule.board)
	const insideRef = useRef()

	return (
		<section className="group-list" ref={insideRef}>
			{board?.groups?.map(group =>
				<GroupPreview key={group.id} group={group} onRemoveGroup={onRemoveGroup} onUpdateTitle={onUpdateTitle} />
			)}

			<CreateItem onAddItem={onAddGroup} initialBtnLbl='Add another list' addBtnLabel='Add list' placeholder='Enter list title...' insideRef={insideRef} />

		</section >
	)
}
