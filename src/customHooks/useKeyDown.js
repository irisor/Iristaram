import { useCallback, useEffect } from "react";

export function useKeyDown(HandleOnKeyDown,isRendered, specialKeys){
    useEffect(()=>{

        if(isRendered){
            console.log("Added listener")
            document.addEventListener('keydown', onKeyDown)
        }
        else{
            document.removeEventListener('keydown', onKeyDown)
        }
        return () => {
            console.log("Removed listener")
            document.removeEventListener('keydown', onKeyDown)}
    })

    
    const onKeyDown = useCallback((event)=>{
        const isSpecialKeyDown = specialKeys.some(key => key === event.key)
        if(isSpecialKeyDown){
            event.preventDefault()
            HandleOnKeyDown()
        }
    })
}