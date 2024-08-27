export function useResizeInput(inputRef) {

	function resizeInput() {
		if (inputRef.current) {
			inputRef.current.style.height = inputRef.current.scrollHeight + 'px'
		}
	}

	return { resizeInput }
}