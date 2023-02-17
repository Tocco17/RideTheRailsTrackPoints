import Color from "@/models/Color"
import { useEffect, useState } from "react"

type ColorComponentType = {
    color: Color
    radius?: number
    check: boolean
    onClick?: any
    className?: string 
}

export default function ColorComponent ({color, radius, check, onClick, className} : ColorComponentType) {
    const [classes, setClasses] = useState<string>()

    useEffect(() => {
        let classToBeSet = `${className} w-${radius ?? 8} h-${radius ?? 8} bg-[${color.hex}] rounded-full `
        if(!check) classToBeSet += 'bg-opacity-25 '
        setClasses(classToBeSet)
    }, [check])
    
    return <>
    <div className={classes} onClick={onClick}></div>
    </>
}