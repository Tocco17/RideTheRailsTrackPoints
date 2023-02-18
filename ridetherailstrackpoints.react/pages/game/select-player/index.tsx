import PlayerComponent from "@/components/Game/PlayerComponent";
import PlayerInterface from "@/interfaces/PlayerInterface";
import { Colors } from "@/models/Color";
import Player from "@/models/Player";
import PlayerBoard from "@/models/PlayerBoard";
import LocalStorageUtility from "@/utilities/storageUtility";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface PlayerToBeSelected extends PlayerInterface {
    checked: boolean
}

const SelectPlayer: NextPage = () => {
    const router = useRouter()

    const [number, setNumber] = useState(3)
    const [players, setPlayers] = useState<PlayerToBeSelected[]>()
    const [playersSelected, setPlayersSelected] = useState<Player[]>()


    useEffect(() => {
        setPlayers([
            {
                checked: true,
                color: Colors.Player.white,
                moneys: 0,
                name: 'Bea',
                playerBoard: new PlayerBoard()
            },
            {
                checked: true,
                color: Colors.Player.cyan,
                moneys: 0,
                name: 'Fede',
                playerBoard: new PlayerBoard()
            },
            {
                checked: true,
                color: Colors.Player.green,
                moneys: 0,
                name: 'Leo',
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
        if(number < 3) return

        LocalStorageUtility.write(LocalStorageUtility.playersKey, players)
        LocalStorageUtility.write(LocalStorageUtility.roundKey, 1)
        router.push('take-a-share')
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

export default SelectPlayer