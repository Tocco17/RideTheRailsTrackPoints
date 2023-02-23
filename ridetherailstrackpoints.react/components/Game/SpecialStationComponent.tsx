import SpecialStation from "@/models/SpecialStation"

type SpecialStationComponentType = {
    station: SpecialStation,
    onClick: (...props: any) => any
}

export default function SpecialStationComponent({station, onClick}: SpecialStationComponentType) {
    return (
        <>
        <div className="flex flex-col items-center content-center justify-center">
            <button className="flex flex-col items-center content-center justify-center special-station-button" onClick={onClick}>
                <label className="cursor-pointer">+ {station.moneys}$</label>
                <label className="cursor-pointer">{station.name}</label>
            </button>
        </div>
        </>
    )
}