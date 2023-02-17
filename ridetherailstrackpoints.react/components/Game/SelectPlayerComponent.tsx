import Player from "@/models/Player";
import { useState } from "react";



export default function SelectPlayer(onPlayerSelection: any){
    const [number, setNumber] = useState(3)

    const changeNumberOfPlayers = (event: Event, newValue: number | number[]) => {
        setNumber(newValue as number)
    }

    return (
        <>
        <div>
        </div>
        <div>
            SLIDER DIV: {number}
        </div>
        </>
    )
}