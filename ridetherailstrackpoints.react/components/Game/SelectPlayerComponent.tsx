import PlayerInterface from "@/interfaces/PlayerInterface";
import { Colors } from "@/models/Color";
import Player from "@/models/Player";
import PlayerBoard from "@/models/PlayerBoard";
import { useEffect, useState } from "react";
import PlayerComponent from "./PlayerComponent";

interface PlayerToBeSelected extends PlayerInterface {
    checked: boolean
}

type SelectPlayerType = {
    onPlayerSelection: (players: Player[]) => any
}

export default function SelectPlayer({onPlayerSelection}: SelectPlayerType){
    const [number, setNumber] = useState(3)
    const [players, setPlayers] = useState<PlayerToBeSelected[]>()
    const [playersSelected, setPlayersSelected] = useState<Player[]>()

    useEffect(() => {
        setPlayers([
            {
                checked: false,
                color: Colors.Player.white,
                moneys: 0,
                name: 'Piero',
                playerBoard: new PlayerBoard()
            },
            {
                checked: false,
                color: Colors.Player.cyan,
                moneys: 0,
                name: '',
                playerBoard: new PlayerBoard()
            },
            {
                checked: false,
                color: Colors.Player.green,
                moneys: 0,
                name: '',
                playerBoard: new PlayerBoard()
            },
            {
                checked: false,
                color: Colors.Player.pink,
                moneys: 0,
                name: '',
                playerBoard: new PlayerBoard()
            },
            {
                checked: false,
                color: Colors.Player.red,
                moneys: 0,
                name: '',
                playerBoard: new PlayerBoard()
            },
        ])
    }, [])

    useEffect(() => {
        setPlayersSelected(players?.filter(p => p.checked)?.map(p => new Player(p.name, p.color)))
    }, [players])

    useEffect(() => {
        setNumber(playersSelected?.filter(p => p.name).length ?? 0)
    }, [playersSelected])

    const onNameChange = (event: any, index: number) => {
        setPlayers(players?.map((p, i) => {
            if(i === index) p.name = event.target.value
            return p
        }))
    }

    const onColorClicked = (index: number) => {
        setPlayers(players?.map((p, i) => {
            if(i === index) p.checked = !p.checked
            return p
        }))
    }

    const onSubmit = (e: any) => {
        e.preventDefault()
        if(number >= 3) onPlayerSelection(playersSelected ?? [])
    }

    return (
        <>
        <form onSubmit={onSubmit} className='flex flex-col flex-wrap items-center justify-center min-h-screen'>
        {
            players?.map((p, i) => <PlayerComponent key={i} player={p} checked={p.checked} onColorClick={(_: any) => onColorClicked(i)} onNameChange={(e: any) => onNameChange(e, i)}/>)
        }
        {
            number >= 3 && 
            <button type="submit" className="self-end">Next</button>
        }
        </form>
        </>
    )
}