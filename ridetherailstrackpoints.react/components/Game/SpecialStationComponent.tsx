import SpecialStation from "@/models/SpecialStation"
import SpecialStationChecked from "@/models/SpecialStationChecked"
import { useEffect, useState } from "react"

type SpecialStationComponentType = {
    station: SpecialStationChecked
    playingIndex: number
    onClick: (...props: any) => any
}

/*
!check
check & playerIndex
check & !playerIndex
*/

const SpecialStationComponent = ({station, playingIndex, onClick}: SpecialStationComponentType) => {
    station.isFull = SpecialStation.prototype.isFull
    station.isCheck = SpecialStationChecked.prototype.isCheck

    const [buttonClassName, setButtonClassName] = useState<string>('flex flex-col items-center content-center justify-center special-station-button')

    useEffect(() => {
        const defaultClassName = 'flex flex-col items-center content-center justify-center special-station-button'

        if(!isCheck()) return setButtonClassName(defaultClassName)

        if(station.playerIndeces.includes(playingIndex)) setButtonClassName(defaultClassName + ' check-active')
        else if(!!station.limitation && station.playerIndeces.length === station.limitation) setButtonClassName(defaultClassName + ' check-inactive')
    }, [station.playerIndeces, playingIndex])

    const isCheck = () => {
        return station.playerIndeces.includes(playingIndex)
    }

    
    return (
        <>
        {
            !station.isFull() &&
            <div className="flex flex-col items-center content-center justify-center">
                <button className={buttonClassName} onClick={onClick}>
                    <label className="cursor-pointer">+ {station.moneys}$</label>
                    <label className="cursor-pointer">{station.name}</label>
                </button>
            </div>
        }
        </>
    )
}

export default SpecialStationComponent