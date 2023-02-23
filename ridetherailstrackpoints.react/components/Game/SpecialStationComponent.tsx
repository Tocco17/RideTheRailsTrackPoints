import SpecialStation from "@/models/SpecialStation"
import SpecialStationChecked from "@/models/SpecialStationChecked"
import { useEffect, useState } from "react"

type SpecialStationComponentType = {
    station: SpecialStationChecked
    playingIndex: number
    onClick: (...props: any) => any
}

const SpecialStationComponent = ({station, playingIndex, onClick}: SpecialStationComponentType) => {
    station.isFull = SpecialStation.prototype.isFull

    const [buttonClassName, setButtonClassName] = useState<string>('flex flex-col items-center content-center justify-center special-station-button')

    useEffect(() => {
        setButtonClassName(computeClassName())
    }, [station.playerIndeces, playingIndex])

    const computeClassName = () => {
        const defaultClassName = 'flex flex-col items-center content-center justify-center special-station-button'
        if(!station.playerIndeces) return defaultClassName
        if(station.playerIndeces.includes(playingIndex)) return defaultClassName + ' check-active'
        if(station.limitation === station.achievedPlayers.length + station.playerIndeces.length) return defaultClassName + ' check-inactive'
        return defaultClassName
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