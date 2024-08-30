import { useEffect } from 'react'

export function useClickOutside(handleOnClickOutside, ref) {
    useEffect(() => {
        if (!ref.current) return

        function listener(event) {
            if (!ref.current || ref.current.contains(event.target)) {
                return
            }
            handleOnClickOutside(event)
        }
        document.addEventListener('mousedown', listener)
        document.addEventListener('touchstart', listener)

        function handleKeydown(event) {
            if (event.key === 'Escape') {
                handleOnClickOutside(event)
            }
        }
        document.addEventListener('keydown', handleKeydown)

        return () => {
            document.removeEventListener('keydown', handleKeydown)
            document.removeEventListener('mousedown', listener)
            document.removeEventListener('touchstart', listener)
        }
    }, [ref, handleOnClickOutside])
}
