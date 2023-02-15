import Player from "@/models/Player";
import { Slider } from "@mui/material";
import { useState } from "react";



export default function SelectPlayer(onPlayerSelection: any){
    const [number, setNumber] = useState(3)

    const changeNumberOfPlayers = (event: Event, newValue: number | number[]) => {
        setNumber(newValue as number)
    }

    return (
        <>
        <div>
            <Slider defaultValue={3} step={1} marks min={3} max={5} onChange={changeNumberOfPlayers} value={number}/>
        </div>
        <div>
            SLIDER DIV: {number}
        </div>
        </>
    )
}