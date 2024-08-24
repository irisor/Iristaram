import { Link, useParams } from "react-router-dom";

export function TaskPreview({ task }) {
    const { boardId } = useParams()
    const totalCheckItems = task.checklists?.flatMap(checklist => checklist.checkItems).length || 0;
    const checkedItems = task.checklists?.flatMap(checklist => checklist.checkItems).filter(checkItem => checkItem?.checked).length || 0;
    const isCompleted = totalCheckItems > 0 && totalCheckItems === checkedItems;


    function toggleLabelCollapse(ev) {
        ev.stopPropagation()
        ev.preventDefault()
        ev.currentTarget.closest(".task-preview-labels").classList.toggle("collapsed")
    }

    return (
        <div className="task-preview">
            <Link to={`/boards/${boardId}/${task.id}`}>
                {task.cover?.url && <img className="task-preview-cover" src={task.cover?.url} alt="cover" />}
                <div className="task-preview-container">
                    <div className="task-preview-labels collapsed">
                        {task.labels?.map(label => <div key={label.id} className="task-preview-label" style={{ backgroundColor: label.color }} onClick={ev => toggleLabelCollapse(ev)}><div className="task-preview-label-title">{label.title}</div></div>)}
                    </div>
                    <p>{task.title}</p>
                    <section className="task-preview-badges">
                        {task.checklists?.length > 0 &&
                            <div className={`task-preview-badge ${isCompleted && "completed"}`}>
                                <span className="icon icon-sm icon-checkbox-checked" />
                                <span className="info">{checkedItems}/{totalCheckItems}</span>
                            </div>
                        }
                    </section>
                </div>
            </Link>
        </div>
    )
}
