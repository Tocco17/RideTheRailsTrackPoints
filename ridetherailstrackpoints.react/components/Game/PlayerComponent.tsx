import PlayerInterface from "@/interfaces/PlayerInterface"
import { useEffect, useState } from "react"
import ColorComponent from "./ColorComponent"

type PlayerComponentProps = {
    player: PlayerInterface
    check: boolean
    onNameChange?: any
    onColorClick?: any
}

export default function PlayerComponent ({player, check, onColorClick, onNameChange} : PlayerComponentProps)  {
    const [isOk, setIsOk] = useState<boolean>()

    useEffect(() => {
        setIsOk(check && !!player && !!player.name)
    }, [player, player.name, check])

    return <>
    <div className="flex p-4 flex-row content-center items-center">
        <ColorComponent color={player.color} check={check} onClick={onColorClick}>
            {isOk && 'OK'}
        </ColorComponent>
        {
            check && (
                <>
                <div className="pl-4">
                {
                    onNameChange
                    ? check && (<input type="text" defaultValue={player.name} onChange={onNameChange}></input>)
                    : (<label>{player.name}</label>)
                }
                </div>
                </>
            )
        }
        
    </div>
    </>
}