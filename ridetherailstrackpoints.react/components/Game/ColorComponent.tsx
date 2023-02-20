import Color from "@/models/Color"
import { useEffect, useState } from "react"

type ColorComponentType = {
    color: Color
    check: boolean
    onClick?: any
    children?: React.ReactNode
}

export default function ColorComponent ({color, check, onClick, children} : ColorComponentType) {
    const [classes, setClasses] = useState<string>()
    const [hasBeenRendered, setHasBeenRendered] = useState<boolean>(false)
    
    useEffect(() => {
        if(hasBeenRendered) return
        
        setHasBeenRendered(true)
        setCorrectClasses(check, color.name)
    }, [])

    useEffect(() => {
        setCorrectClasses(check, color.name)
    }, [check, color.name])

    const setCorrectClasses = (check: boolean, colorName: string) => {
        setClasses(`w-8 h-8 rounded-full bg-p-${colorName} ${check ? '' : 'bg-opacity-color'} color-component`)
    }
    
    return (
    <>
    <button className={classes} onClick={onClick}>
        {children}
    </button>
    </>
    )
}