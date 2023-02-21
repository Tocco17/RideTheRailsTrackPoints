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
    const [playingIndex, setPlayingIndex] = useState<number>(0) //The index of the player that is playing
    const [locomotives, setLocomotives] = useState<LocomotiveInterface[]>([]) //Selectable locomotives
    const [playingPlayerBoard, setPlayingPlayerBoard] = useState<TakeASharePlayerBoard>()
    const [playerBoards, setPlayerBoards] = useState<TakeASharePlayerBoard[]>([]) //What has been selected by each player
    const [hasSelected, setHasSelected] = useState<boolean>(false)
    const [hasPrevious, setHasPrevious] = useState<boolean>(false)
    const [buttonsClassName, setButtonsClassName] = useState<string>('flex flex-row min-w-screen max-w-screen')

    //Set the base 
    useEffect(() => {
        const playersStored = LocalStorageUtility.read(LocalStorageUtility.playersKey) as PlayerInterface[] //Read from the localStorage
        const length = playersStored.length

        setPlayers(playersStored)
        setPlayingIndex(length - 1) //We start from the last player
        // setRound(LocalStorageUtility.read(LocalStorageUtility.roundKey))
        setRound(6)

        setPlayerBoards(playersStored.map((_, i) => new TakeASharePlayerBoard(i)))
    }, [])

    //Set the default value of all locomotives
    useEffect(() => {
        setDefaultLocomotives()
    }, [round])

    //Change the playing playerboard and see if there are any previous player
    useEffect(() => {
        setPlayingPlayerBoard(TakeASharePlayerBoard.findPlayerBoard(playerBoards, playingIndex))
        setHasPrevious(playingIndex !== players.length - 1)
    }, [playingIndex])

    //See if the player has selected a locomotive
    useEffect(() => {
        console.log('hasSelected')
        setHasSelected(!!playingPlayerBoard && playingPlayerBoard?.locomotiveIndex >= 0) //If the playing user has selected a locomotive
    }, [playerBoards, playingPlayerBoard])

    //Set the buttons classes list
    useEffect(() => {
        const defaultButtonsClassName = 'flex flex-row min-w-screen max-w-screen'
        const moreClassNames = hasSelected && hasPrevious
            ? ' justify-between'
            : hasSelected
                ? ' justify-end'
                : ' justify-start'
        setButtonsClassName(defaultButtonsClassName + moreClassNames)
    }, [hasSelected, hasPrevious])

    //Sets all the locomotives necessary for the round with the default values
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

    //Go to the previous player
    const previousPlayer = () => {
        if(playingIndex === players.length - 1) return
        
        setPlayingIndex(playingIndex + 1)
        setDefaultLocomotives()
    }

    //Set the next player that has to play
    const nextPlayer = (event: any) => {
        event.preventDefault()
        if(playingIndex === 0){
            nextPhase(event, true)
            return
        }

        setDefaultLocomotives()
        setPlayingIndex(playingIndex - 1)
    }

    //Go to the next phase of the game
    const nextPhase = (event: any, fromNextPlayer = false) => {
        if(fromNextPlayer) event.preventDefault()

        setPlayers(players.map((p, i) => {
            p.playerBoard.add(locomotives[TakeASharePlayerBoard.findLocomotive(playerBoards, i)].name)            
            return p
        }))

        LocalStorageUtility.write(LocalStorageUtility.playersKey, players)
    }

    //Manage the click of a locomotive
    const onLocomotiveClick = (event: any, index: number) => {
        event.preventDefault()

        setLocomotives(locomotives.map((l, i) => {return {...l, check: i === index && !l.check}}))

        /*
        playingPlayerBoard is saved with reference to a playerBoards element
        If we change one element here, we change also the value of playingPlayerboard without useEffect
        */
        setPlayerBoards(
            playerBoards.map(pb => {
                if(pb.playerIndex === playingIndex) 
                    pb.locomotiveIndex = pb.locomotiveIndex !== index ? index : -1
                
                return pb
            })
        )
    }

    return (
        <>
        <div className="flex flex-col pt-20 min-h-screen max-h-screen">
            <TurnOrderComponent players={players} inPlay={playingIndex}/>
            {/* <div className="flex flex-row flex-wrap justify-center content-center min-h-screen max-h-screen pt-10 "> */}
            <div className="flex flex-col flex-wrap justify-center content-center  flex-grow">
                {
                    locomotives?.map((l, i) => 
                    <LocomotiveComponent color={l} key={i} check={l.check} onClick={(e:any) => onLocomotiveClick(e, i)}/>)
                }
            </div>
            <div className={buttonsClassName}>
                {
                    hasPrevious && <button className="px-20 pb-10" onClick={previousPlayer}>PREVIOUS</button>
                }
                {
                    hasSelected && <button className="px-20 pb-10" onClick={nextPlayer}>NEXT</button>
                }
            </div>
        </div>
        </>
    )
}

export default TakeAShare