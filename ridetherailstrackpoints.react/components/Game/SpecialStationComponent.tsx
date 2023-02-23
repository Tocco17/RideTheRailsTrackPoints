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
    const [buttonClassName, setButtonClassName] = useState<string>('flex flex-col items-center content-center justify-center special-station-button')

    useEffect(() => {
        const defaultClassName = 'flex flex-col items-center content-center justify-center special-station-button'

        if(!station.check) return setButtonClassName(defaultClassName)

        let moreClassName = ''
            if(station.playerIndex.includes(playingIndex)) moreClassName = 'check-active'
            else if(!!station.limitation && station.playerIndex.length === station.limitation) moreClassName = 'check-inactive'

        setButtonClassName(defaultClassName + ' ' + moreClassName)
    }, [station.check, station.playerIndex, playingIndex])

    
    station.isFull = SpecialStation.prototype.isFull
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