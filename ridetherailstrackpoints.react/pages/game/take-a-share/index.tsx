import LocomotiveComponent from "@/components/Game/LocomotiveComponent";
import TurnOrderComponent from "@/components/Game/TurnOrderComponent";
import ColorInterface from "@/interfaces/ColorInterface";
import PlayerInterface from "@/interfaces/PlayerInterface";
import Color, { Colors } from "@/models/Color";
import Player from "@/models/Player";
import LocalStorageUtility from "@/utilities/storageUtility";
import { NextPage } from "next";
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

    public static findLocomotive = (playerBoards: TakeASharePlayerBoard[], playerIndex: number) => {
        return playerBoards.find(pb => pb.playerIndex === playerIndex)?.locomotiveIndex ?? -1
    }

    public static findPlayerBoard = (playerBoards: TakeASharePlayerBoard[], playerIndex: number) => {
        return playerBoards.find(pb => pb.playerIndex === playerIndex)
    }
}

const TakeAShare: NextPage = () => {
    const [players, setPlayers] = useState<PlayerInterface[]>([]) //Playing players
    const [round, setRound] = useState<number>(1) //Round in play
    const [locomotives, setLocomotives] = useState<LocomotiveInterface[]>([]) //Selectable locomotives
    
    const [playerBoards, setPlayerBoards] = useState<TakeASharePlayerBoard[]>([]) //What has been selected by each player

    const [playingIndex, setPlayingIndex] = useState<number>(0) //The index of the player that is playing
    const [playingPlayerBoard, setPlayingPlayerBoard] = useState<TakeASharePlayerBoard>()
    
    const [hasNext, setHasNext] = useState<boolean>(false)
    const [hasPrevious, setHasPrevious] = useState<boolean>(false)

    const [buttonsClassName, setButtonsClassName] = useState<string>('flex flex-row min-w-screen max-w-screen')

    const [locomotiveComponent, setLocomotiveComponent] = useState<any>()

    const [hasBeenRendered, setHasBeenRendered] = useState<boolean>(false)

    //First render
    useEffect(() => {
        console.log('Render')
        
        // if(hasBeenRendered) return

        const playersStored = LocalStorageUtility.read(LocalStorageUtility.playersKey) as PlayerInterface[] //Read from the localStorage

        setPlayers(playersStored)

        // setRound(LocalStorageUtility.read(LocalStorageUtility.roundKey))
        setRound(6)

        // setHasBeenRendered(true)
    }, [])

    useEffect(() => {
        console.log('Players')
        
        setPlayingIndex(players.length - 1)
        setPlayerBoards(players.map((_, i) => new TakeASharePlayerBoard(i)))
    }, [players])

    //When round is changed then set the default locomotives value
    useEffect(() => {
        console.log('Round')
        
        setDefaultLocomotives()
    }, [round])

    //Whenever the playing index changes then the playing playerboard must change
    useEffect(() => {
        console.log('playingIndex')
        
        setPlayingPlayerBoard(TakeASharePlayerBoard.findPlayerBoard(playerBoards, playingIndex))
        setHasPrevious(playingIndex !== players.length - 1)
    }, [playingIndex])

    

    //Whenever the locomotive index selected changes recalculate the hasNext boolean and save the data onto playerBoards
    useEffect(() => {
        console.log('playingPlayerBoard.locomotiveIndex')
        
        const locomotiveIndex = !!playingPlayerBoard ? playingPlayerBoard.locomotiveIndex : -1
        setHasNext(locomotiveIndex >= 0)
        setPlayerBoards(playerBoards.map(pb => {
            if(pb.playerIndex === playingIndex) pb.locomotiveIndex = locomotiveIndex
            return pb
        }))
    }, [playingPlayerBoard?.locomotiveIndex])

    useEffect(() => {
        console.log('playingPlayerBoard')
        setLocomotiveComponentJSX()
    }, [playingPlayerBoard])

    useEffect(() => {
        console.log('hasPrevious, hasNext')
        
        const defaultButtonsClassName = 'flex flex-row min-w-screen max-w-screen'
        const moreClassNames = hasNext && hasPrevious
            ? ' justify-between'
            : hasNext
                ? ' justify-end'
                : ' justify-start'
        setButtonsClassName(defaultButtonsClassName + moreClassNames)
    }, [hasPrevious, hasNext])

    

    //Set the default values of all locomotives
    const setDefaultLocomotives = () => {
        const locomotivesAvailable : LocomotiveInterface[] = [
            {...Colors.Locomotive.red, check: false},
            {...Colors.Locomotive.blue, check: false},
        ]
        if(round > 1) locomotivesAvailable.push({...Colors.Locomotive.orange, check: false})
        if(round > 2) locomotivesAvailable.push({...Colors.Locomotive.yellow, check: false})
        if(round > 3) locomotivesAvailable.push({...Colors.Locomotive.purple, check: false})
        if(round > 4) locomotivesAvailable.push({...Colors.Locomotive.black, check: false})
        setLocomotives(locomotivesAvailable)
    }

    const setLocomotiveComponentJSX = () => {
        setLocomotiveComponent(
            locomotives?.map((l, i) => 
                <LocomotiveComponent color={l} key={i}
                    check={!!playingPlayerBoard && playingPlayerBoard.locomotiveIndex === i} 
                    onClick={(e:any) => onLocomotiveClick(e, i)}/>)
        )
    }
    
    const onLocomotiveClick = (event: any, index: number) => {
        event.preventDefault()

        if(!playingPlayerBoard){
            console.error('Playing playerboard missing during the onLocomotiveClick event.')
            return 
        }

        const playerBoard = new TakeASharePlayerBoard(playingPlayerBoard.playerIndex)
        playerBoard.locomotiveIndex = playingPlayerBoard.locomotiveIndex !== index ? index : -1
        setPlayingPlayerBoard(playerBoard)

        // playingPlayerBoard.locomotiveIndex = playingPlayerBoard.locomotiveIndex !== index ? index : -1
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

    }

    // console.log('Inizio')
    // console.log(playingIndex)
    // console.log(playerBoards)
    // console.log(playingPlayerBoard)
    // console.log('Fine')

    return (
        <>
        <div className="flex flex-col pt-20 min-h-screen max-h-screen">
            <TurnOrderComponent players={players} inPlay={playingIndex}/>
            <div className="flex flex-col flex-wrap justify-center content-center flex-grow">
                {
                    // locomotives?.map((l, i) => 
                    // <LocomotiveComponent color={l} key={i}
                    //     check={!!playingPlayerBoard && playingPlayerBoard.locomotiveIndex === i} 
                    //     onClick={(e:any) => onLocomotiveClick(e, i)}/>)
                }
                {
                    locomotiveComponent
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