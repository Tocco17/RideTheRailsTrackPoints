import SpecialStation from "@/models/SpecialStation"
import SpecialStationChecked from "@/models/SpecialStationChecked"

type SpecialStationComponentType = {
    station: SpecialStationChecked,
    onClick: (...props: any) => any
}

export default function SpecialStationComponent({station, onClick}: SpecialStationComponentType) {
    station.isFull = SpecialStation.prototype.isFull
    return (
        <>
        {
            !station.isFull() &&
            <div className="flex flex-col items-center content-center justify-center">
                <button className="flex flex-col items-center content-center justify-center special-station-button" onClick={onClick}>
                    <label className="cursor-pointer">+ {station.moneys}$</label>
                    <label className="cursor-pointer">{station.name}</label>
                </button>
            </div>
        }
        </>
    )
}