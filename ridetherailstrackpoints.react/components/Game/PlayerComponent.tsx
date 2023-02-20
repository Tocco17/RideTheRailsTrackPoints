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
        setIsOk(player.check && !!player && !!player.name)
    }, [player, player.name, player.check])

    return <>
    <div className="flex p-4 flex-row content-center items-center">
        <ColorComponent color={player.color} check={player.check} onClick={onColorClick}>
            {isOk && 'OK'}
        </ColorComponent>
        {
            player.check && (
                <>
                <div className="pl-4">
                {
                    onNameChange
                    ? player.check && (<input type="text" defaultValue={player.name} onChange={onNameChange}></input>)
                    : (<label>{player.name}</label>)
                }
                </div>
                </>
            )
        }
        
    </div>
    </>
}