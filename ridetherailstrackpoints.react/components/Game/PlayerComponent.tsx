import PlayerInterface from "@/interfaces/PlayerInterface"
import { useEffect, useState } from "react"
import ColorComponent from "./ColorComponent"

type PlayerComponentProps = {
    player: PlayerInterface
    onNameChange?: any
    onColorClick?: any
}

export default function PlayerComponent ({player, onColorClick, onNameChange} : PlayerComponentProps)  {
    const [isOk, setIsOk] = useState<boolean>()

    useEffect(() => {
        setIsOk(player.checked && !!player && !!player.name)
    }, [player, player.name, player.checked])

    return <>
    <div className="flex p-4 flex-row content-center items-center">
        <ColorComponent color={player.color} check={player.checked} onClick={onColorClick}>
            {isOk && 'OK'}
        </ColorComponent>
        {
            player.checked && (
                <>
                <div className="pl-4">
                {
                    onNameChange
                    ? player.checked && (<input type="text" defaultValue={player.name} onChange={onNameChange}></input>)
                    : (<label>{player.name}</label>)
                }
                </div>
                </>
            )
        }
        
    </div>
    </>
}