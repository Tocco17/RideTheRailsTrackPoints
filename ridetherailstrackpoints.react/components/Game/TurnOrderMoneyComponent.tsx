import { useEffect, useState } from "react"
import ColorComponent from "./ColorComponent"
import { IoIosArrowDropright } from "react-icons/io";
import PlayerMoneyInterface from "@/interfaces/PlayerMoneyInterface";

type TurnOrderComponentType = {
    players: PlayerMoneyInterface[]
    inPlay: number
    className?: string
}

export default function TurnOrderMoneyComponent({players, inPlay, className} : TurnOrderComponentType) {
    const [number, setNumber] = useState<number>(0)

    useEffect(() => {
        setNumber(players.length)
    }, [players])

    return (
    <>
    <div className={`flex flex-row justify-evenly content-center place-content-center ${className ?? ''}`}>
        {
            players.map((p, i) => {
                return (
                    <>
                    <div className="flex flex-col justify-center content-center items-center">
                        <ColorComponent color={p.color} check={i === inPlay} key={i}>
                            {p.moneys}
                        </ColorComponent>
                        <label className={`flex flex-row justify-center ${i === inPlay ? 'font-extrabold' : ''}`}>{p.name}</label>
                        <label className="flex flex-row justify-center">+ {p.moreMoneys}</label>
                    </div>
                    {   
                        i !== number - 1 &&
                        <div className="flex flex-col justify-center">
                                <IoIosArrowDropright/>
                        </div>
                    }
                    </>
                )
            })
        }
    </div>
    </>
    )
}