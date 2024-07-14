import { useEffect } from "react";

export function useKeyDown(HandleOnKeyDown, specialKeys){

    function onKeyDown(event){
        const isSpecialKeyDown = specialKeys.some(key => key === event.key)
        if(isSpecialKeyDown){
            event.preventDefault()
            HandleOnKeyDown()
        }
    }
    
    
    useEffect(()=>{
        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [onKeyDown])
}