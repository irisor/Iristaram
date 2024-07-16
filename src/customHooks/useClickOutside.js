import { useEffect } from 'react'

export function useClickOutside(handleOnClickOutside, ref) {
    useEffect(() => {
        function listener(event) {
            if (!ref.current || ref.current.contains(event.target)) {
                return
            }
            handleOnClickOutside(event)
        }
        document.addEventListener('mousedown', listener)
        document.addEventListener('touchstart', listener)
        return () => {
            document.removeEventListener('mousedown', listener)
            document.removeEventListener('touchstart', listener)
        }
    }, [ref, handleOnClickOutside])
}
