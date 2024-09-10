export function MenuCarouselItem({ isActive, isVisited, component: Component, onNavigate, onClose }) {

	return (
		<div className={`menu-carousel-item ${(isActive) ? 'active' : ''} ${isVisited ? 'visited' : ''}`}>
			<div className="menu-carousel-item-body">
				<Component onNavigate={onNavigate} onClose={onClose} />
			</div>
		</div>
	)
}
