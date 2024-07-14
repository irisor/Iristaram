import { useEffect } from "react";

export function useKeyDown(HandleOnKeyDown, specialKeys){
    useEffect(()=>{
        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [onKeyDown])

    
    function onKeyDown(event){
        const isSpecialKeyDown = specialKeys.some(key => key === event.key)
        if(isSpecialKeyDown){
            event.preventDefault()
            HandleOnKeyDown()
        }
    }
}