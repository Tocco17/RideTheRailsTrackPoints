import Color from "@/models/Color"
import { useEffect, useState } from "react"
import { WiTrain } from "react-icons/wi";
import { IconContext } from "react-icons"

type LocomotiveComponentType = {
    color: Color,
    check: boolean
    onClick?: any
}

export default function LocomotiveComponent ({color, check, onClick}: LocomotiveComponentType) {
    const [iconContextProvider, setIconContextProvider] = useState<IconContext>({})
    const [className, setClassName] = useState<string>('flex flex-row content-center justify-center')

    useEffect(() => {
        setIconContextProvider({
            color: color.hex,
            size: false || check ? '150' : '100',
            className: true || check ? '' : 'bg-opacity-color',
            style: {
                border: ''
            }
        })
    }, [color])

    useEffect(() => {
        setClassName(`flex flex-row content-center justify-center max-w-min`)
    }, [check])
    
    return (
        <>
        <button className={className} onClick={onClick}>
            <IconContext.Provider value={iconContextProvider}>
                <div className="flex flex-row content-center justify-center">
                    <WiTrain/>
                </div>
            </IconContext.Provider>
            {
                check && <div>OK</div>
            }
        </button>
        </>
    )
}