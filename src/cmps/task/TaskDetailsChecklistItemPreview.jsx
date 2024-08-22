
export function TaskDetailsChecklistItemPreview({ checkItem, onChange }) {


	return (
		<section className="task-details-checklist-item">
				<input type="checkbox" className="task-details-checklist-item-checkbox"
					id={checkItem.id} checked={checkItem.checked} onChange={onChange} name={checkItem.id} />
				<label htmlFor={checkItem.id}>{checkItem.title}</label>
		</section>
	)
}