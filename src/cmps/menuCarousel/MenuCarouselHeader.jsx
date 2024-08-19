export function MenuCarouselHeader({ title = "Menu", showBack, onBack, onClose }) {
	return (
		<>
			<div className="board-menu-header">
				{showBack && (
					<button className="board-menu-header-bck btn icon-wrapper" onClick={onBack}>
						<span className="icon icon-lg icon-back" />
					</button>
				)}
				<h3 className="board-menu-header-title">{title}</h3>
				<button className="board-menu-header-close btn icon-wrapper" onClick={onClose}>
					<span className="icon icon-lg icon-close" />
				</button>
			</div>
			<hr className="board-menu-header-hr" />
		</>
	)
}