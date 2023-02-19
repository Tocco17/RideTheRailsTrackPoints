import PlayerInterface from "@/interfaces/PlayerInterface"
import { useEffect, useState } from "react"
import ColorComponent from "./ColorComponent"

type PlayerComponentProps = {
    player: PlayerInterface
    checked: boolean
    onNameChange?: any
    onColorClick?: any
}

export default function PlayerComponent ({player, checked, onColorClick, onNameChange} : PlayerComponentProps)  {
    const [isOk, setIsOk] = useState<boolean>()

    useEffect(() => {
        setIsOk(checked && !!player && !!player.name)
    }, [checked, player, player.name])

    return <>
    <div className="flex p-4 flex-row content-center items-center">
        <ColorComponent color={player.color} check={checked} onClick={onColorClick}>
            {isOk && 'OK'}
        </ColorComponent>
        {
            checked && (
                <>
                <div className="pl-4">
                {
                    onNameChange
                    ? checked && (<input type="text" defaultValue={player.name} onChange={onNameChange}></input>)
                    : (<label>{player.name}</label>)
                }
                </div>
                </>
            )
        }
        
    </div>
    </>
}