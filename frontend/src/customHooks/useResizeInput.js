import { useCallback } from "react";

export function useResizeInput(inputRef) {

	const resizeInput = useCallback(() => {
		if (inputRef.current) {
			inputRef.current.style.height = inputRef.current.scrollHeight + 'px'
		}
	}, [inputRef])

	return { resizeInput }
}