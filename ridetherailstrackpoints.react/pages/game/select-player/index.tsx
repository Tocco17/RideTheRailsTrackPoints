import PlayerComponent from "@/components/Game/PlayerComponent";
import PlayerInterface from "@/interfaces/PlayerInterface";
import { Colors } from "@/models/Color";
import Player from "@/models/Player";
import PlayerBoard from "@/models/PlayerBoard";
import shuffle from "@/utilities/randomize";
import LocalStorageUtility from "@/utilities/storageUtility";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";



const SelectPlayer: NextPage = () => {
    const router = useRouter()

    const [number, setNumber] = useState(3)
    const [players, setPlayers] = useState<PlayerInterface[]>()
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
        event.preventDefault()
        setPlayers(players?.map((p, i) => {
            if(i === index) p.name = event.target.value
            return p
        }))
    }

    const onColorClicked = (event:any, index: number) => {
        event.preventDefault()
        setPlayers(players?.map((p, i) => {
            if(i === index) p.checked = !p.checked
            return p
        }))
    }

    const onSubmit = (event: any) => {
        event.preventDefault()
        if(!players || number < 3) return

        LocalStorageUtility.write(LocalStorageUtility.playersKey, shuffle(players))
        LocalStorageUtility.write(LocalStorageUtility.roundKey, 1)
        router.push('take-a-share')
    }

    return (
        <>
        <form onSubmit={onSubmit} className='flex flex-col flex-wrap items-center justify-center min-h-screen pr-40'>
            {
                players?.map((p, i) => <PlayerComponent key={i} player={p} onColorClick={(e: any) => onColorClicked(e, i)} onNameChange={(e: any) => onNameChange(e, i)}/>)
            }
            <div className="self-end flex flex-row">
                <label>{number} out of 5 players selected</label>

                {
                    number >= 3 
                    ? <button type="submit" className="pl-8">Next</button>
                    : <label>{`(${3-number} other needed)`}</label>
                }
            </div>
        </form>
        </>
    )
}

export default SelectPlayer