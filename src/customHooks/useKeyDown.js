import { useCallback, useEffect } from "react";

export function useKeyDown(HandleOnKeyDown,isRendered, specialKeys){
    useEffect(()=>{

        if(isRendered){
            document.addEventListener('keydown', onKeyDown)
        }
        else{
            document.removeEventListener('keydown', onKeyDown)
        }
        return () => {
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