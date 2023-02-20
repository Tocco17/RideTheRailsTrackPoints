import LocomotiveComponent from "@/components/Game/LocomotiveComponent";
import TurnOrderComponent from "@/components/Game/TurnOrderComponent";
import ColorInterface from "@/interfaces/ColorInterface";
import PlayerInterface from "@/interfaces/PlayerInterface";
import Color, { Colors } from "@/models/Color";
import LocalStorageUtility from "@/utilities/storageUtility";
import { NextPage } from "next";
import { useEffect, useState } from "react";

interface LocomotiveInterface extends ColorInterface {
    check: boolean
}

const TakeAShare: NextPage = () => {
    const [players, setPlayers] = useState<PlayerInterface[]>([])
    const [number, setNumber] = useState<number>(0)
    const [round, setRound] = useState<number>(1)
    const [lastPlayer, setLastPlayer] = useState<number>(0)
    const [locomotives, setLocomotives] = useState<LocomotiveInterface[]>([])
    const [hasSelected, setHasSelected] = useState<boolean>(false)


    useEffect(() => {
        const playersStored = LocalStorageUtility.read(LocalStorageUtility.playersKey)
        const length = playersStored.length
        playersStored[length - 1].check = true

        setNumber(length)
        setLastPlayer(length - 1)
        setPlayers(playersStored)
        // setRound(LocalStorageUtility.read(LocalStorageUtility.roundKey))
        setRound(6)
    }, [])

    useEffect(() => {
        const locomotivesAvailable : LocomotiveInterface[] = [
            {...Colors.Locomotive.red, check: false},
            {...Colors.Locomotive.blue, check: false},
        ]
        console.log(6)
        if(round > 1) locomotivesAvailable.push({...Colors.Locomotive.orange, check: false})
        if(round > 2) locomotivesAvailable.push({...Colors.Locomotive.yellow, check: false})
        if(round > 3) locomotivesAvailable.push({...Colors.Locomotive.purple, check: false})
        if(round > 4) locomotivesAvailable.push({...Colors.Locomotive.black, check: false})
        setLocomotives(locomotivesAvailable)
    }, [round])

    const nextPlayer = (event: any) => {
        event.preventDefault()
        if(lastPlayer === 0){
            nextPhase(event, true)
            return
        }

        setPlayers(
            players.map((p, i) => {
                if(i === lastPlayer) p.check = false
                if(i === lastPlayer - 1) p.check = true
                return p
            })
        )
        setLastPlayer(lastPlayer - 1)
    }

    const nextPhase = (event: any, fromNextPlayer = false) => {
        if(fromNextPlayer) event.preventDefault()
    }

    const onLocomotiveClick = (index: number) => {
        setLocomotives(locomotives.map((l, i) => {return {...l, check: i === index && !l.check}}))
        setHasSelected(locomotives[index].check)
        setPlayerBoard(locomotives[index])
    }

    const setPlayerBoard = (locomotive: LocomotiveInterface) => {
        setPlayers(players.map(p => {
            if(!p.check) return p

            return p
        }))
    }



    return (
        <>
        <div className="pt-20">
            <TurnOrderComponent players={players}/>
            <div className="flex flex-row flex-wrap justify-center content-center min-h-screen max-h-screen pt-10 ">
                {
                    locomotives?.map((l, i) => <LocomotiveComponent color={l} key={i} check={l.check} onClick={(e:any) => onLocomotiveClick(i)}/>)
                }
            </div>
        </div>
        </>
    )
}

export default TakeAShare