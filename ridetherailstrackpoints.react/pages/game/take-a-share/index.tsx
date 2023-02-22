import LocomotiveComponent from "@/components/Game/LocomotiveComponent";
import TurnOrderComponent from "@/components/Game/TurnOrderComponent";
import ColorInterface from "@/interfaces/ColorInterface";
import PlayerInterface from "@/interfaces/PlayerInterface";
import { Colors } from "@/models/Color";
import useStore from "@/stores/gameStore";
import { NextPage } from "next";
import router from "next/router";
import { useEffect, useState } from "react";

interface LocomotiveInterface extends ColorInterface {
    check: boolean
}

class TakeASharePlayerBoard {
    public playerIndex: number
    public locomotiveIndex: number

    constructor(playerIndex: number){
        this.playerIndex = playerIndex
        this.locomotiveIndex = -1
    }

    public static newPlayerBoards = (players: PlayerInterface[]) => {
        return players.map((_, i) => new TakeASharePlayerBoard(i))
    }

    public static findLocomotive = (playerBoards: TakeASharePlayerBoard[], playerIndex: number) => {
        return playerBoards.find(pb => pb.playerIndex === playerIndex)?.locomotiveIndex ?? -1
    }

    public static findPlayerBoard = (playerBoards: TakeASharePlayerBoard[], playerIndex: number) => {
        return playerBoards.find(pb => pb.playerIndex === playerIndex) ?? new TakeASharePlayerBoard(playerIndex)
    }
}

//Set the default values of all locomotives
const setDefaultLocomotives = (round: number, index?: number) => {
    const locomotives : LocomotiveInterface[] = [
        {...Colors.Locomotive.red, check: false},
        {...Colors.Locomotive.blue, check: false},
    ]
    if(round > 1) locomotives.push({...Colors.Locomotive.orange, check: false})
    if(round > 2) locomotives.push({...Colors.Locomotive.yellow, check: false})
    if(round > 3) locomotives.push({...Colors.Locomotive.purple, check: false})
    if(round > 4) locomotives.push({...Colors.Locomotive.black, check: false})

    return locomotives
}

const TakeAShare: NextPage = () => {
    const [players, round, setPlayersStored] = useStore((state) => [state.players, state.round, state.setPlayers])

    const [locomotives, setLocomotives] = useState<LocomotiveInterface[]>(setDefaultLocomotives(round)) //Selectable locomotives
    
    const [playerBoards, setPlayerBoards] = useState<TakeASharePlayerBoard[]>(TakeASharePlayerBoard.newPlayerBoards(players)) //What has been selected by each player

    const [playingIndex, setPlayingIndex] = useState<number>(players.length - 1) //The index of the player that is playing
    const [playingPlayerBoard, setPlayingPlayerBoard] = useState<TakeASharePlayerBoard>(TakeASharePlayerBoard.findPlayerBoard(playerBoards, playingIndex))
    
    const [hasNext, setHasNext] = useState<boolean>(false)
    const [hasPrevious, setHasPrevious] = useState<boolean>(false)

    const [buttonsClassName, setButtonsClassName] = useState<string>('flex flex-row min-w-screen max-w-screen')

    //Whenever the playing index changes then the playing playerboard must change
    useEffect(() => {
        setPlayingPlayerBoard(TakeASharePlayerBoard.findPlayerBoard(playerBoards, playingIndex))
        setHasPrevious(playingIndex !== players.length - 1)
    }, [playingIndex])

    //Whenever the locomotive index selected changes recalculate the hasNext boolean and save the data onto playerBoards
    useEffect(() => {
        const locomotiveIndex = !!playingPlayerBoard ? playingPlayerBoard.locomotiveIndex : -1

        setHasNext(locomotiveIndex >= 0)
        setPlayerBoards(playerBoards.map(pb => {
            if(pb.playerIndex === playingIndex) pb.locomotiveIndex = locomotiveIndex
            return pb
        }))

        setLocomotives(setDefaultLocomotives(round).map((l, i) => {
            l.check = locomotiveIndex === i
            return l
        }))
    }, [playingPlayerBoard?.locomotiveIndex])

    //Sets the correct classes list 
    useEffect(() => {
        const defaultButtonsClassName = 'flex flex-row min-w-screen max-w-screen'
        const moreClassNames = hasNext && hasPrevious
            ? ' justify-between'
            : hasNext
                ? ' justify-end'
                : ' justify-start'
        setButtonsClassName(defaultButtonsClassName + moreClassNames)
    }, [hasPrevious, hasNext])
    
    const onLocomotiveClick = (event: any, index: number) => {
        event.preventDefault()

        if(!playingPlayerBoard){
            console.error('Playing playerboard missing during the onLocomotiveClick event.')
            return 
        }

        const playerBoard = new TakeASharePlayerBoard(playingPlayerBoard.playerIndex)
        playerBoard.locomotiveIndex = playingPlayerBoard.locomotiveIndex !== index ? index : -1
        setPlayingPlayerBoard(playerBoard)
    }

    const previousPlayer = (event: any) => {
        event.preventDefault()
        if(playingIndex !== players.length - 1) setPlayingIndex(playingIndex+1)
    }

    const nextPlayer = (event: any) => {
        event.preventDefault()
        if(playingIndex === 0) return nextPhase()
        setPlayingIndex(playingIndex - 1)
    }

    const nextPhase = () => {
        setPlayersStored(players.map((p, i) => {
            p.playerBoard.add(locomotives[TakeASharePlayerBoard.findLocomotive(playerBoards, i)].name)
            return p
        }))

        router.push('build-railroad-track')
    }

    return (
        <>
        <div className="flex flex-col pt-20 min-h-screen max-h-screen">
            <TurnOrderComponent players={players} inPlay={playingIndex}/>
            <div className="flex flex-col flex-wrap justify-center content-center flex-grow">
                {
                    !!playerBoards && 
                    locomotives?.map((l, i) => 
                    <LocomotiveComponent color={l} key={i}
                        check={playingPlayerBoard.locomotiveIndex === i} 
                        onClick={(e:any) => onLocomotiveClick(e, i)}/>)
                }
            </div>
            <div className={buttonsClassName}>
                {
                    hasPrevious && <button className="px-20 pb-10" onClick={previousPlayer}>PREVIOUS</button>
                }
                {
                    hasNext && <button className="px-20 pb-10" onClick={nextPlayer}>NEXT</button>
                }
            </div>
        </div>
        </>
    )
}

export default TakeAShare