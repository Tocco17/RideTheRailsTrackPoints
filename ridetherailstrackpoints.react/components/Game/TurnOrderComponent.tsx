import PlayerInterface from "@/interfaces/PlayerInterface"
import { useEffect, useState } from "react"
import ColorComponent from "./ColorComponent"
import { IoIosArrowDropright } from "react-icons/io";

type TurnOrderComponentType = {
    players: PlayerInterface[]
    inPlay: number
    className?: string
}

export default function TurnOrderComponent({players, inPlay, className} : TurnOrderComponentType) {
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
                    <ColorComponent color={p.color} check={i === inPlay} key={i}/>
                    {   
                        i !== number - 1 &&
                        <IoIosArrowDropright/>
                    }
                    </>
                )
            })
        }
    </div>
    </>
    )
}