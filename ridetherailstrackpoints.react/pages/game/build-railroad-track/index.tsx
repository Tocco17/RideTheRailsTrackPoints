import SpecialStationComponent from "@/components/Game/SpecialStationComponent";
import TurnOrderComponent from "@/components/Game/TurnOrderComponent";
import TurnOrderMoneyComponent from "@/components/Game/TurnOrderMoneyComponent";
import PreviousNextComponent from "@/components/UI/PreviousNextComponent";
import PlayerInterface from "@/interfaces/PlayerInterface";
import PlayerMoneyInterface from "@/interfaces/PlayerMoneyInterface";
import { Colors } from "@/models/Color";
import PlayerBoard from "@/models/PlayerBoard";
import SpecialStation from "@/models/SpecialStation";
import SpecialStationChecked from "@/models/SpecialStationChecked";
import useStore from "@/stores/gameStore";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const getDefaultPlayersToPlay = (players: PlayerInterface[]) => players.map(p => ({...p, moreMoneys: 0} as PlayerMoneyInterface))

const getSpecialStations = (stations: SpecialStation[]) => stations.map((s, i) => ({...s, id: i, playerIndeces: [] as number[]} as SpecialStationChecked))

const getDefaultPlayers: () => PlayerInterface[] = () => [
        {
            color: Colors.Player.white,
            moneys: 5,
            name: 'Bea',
            playerBoard: new PlayerBoard(),
        },
        {
            color: Colors.Player.cyan,
            moneys: 10,
            name: 'Fede',
            playerBoard: new PlayerBoard(),
        },
        {
            color: Colors.Player.green,
            moneys: 15,
            name: 'Leo',
            playerBoard: new PlayerBoard(),
        },
    ]

const getDefaultChicago: () => SpecialStation = () => new SpecialStation('Chicago', 5)

const getFiveDollarsCities: () => SpecialStation[] = () => [
    new SpecialStation('Kansas', 5, 1),
    new SpecialStation('New York', 5, 1),
    new SpecialStation('Los Angeles', 5, 1),
    new SpecialStation('Hollywood', 5, 1),
]
const getTranscontinental: () => SpecialStation = () => new SpecialStation('Transcontinental', 8, 1)
const getFullTranscontinental: () => SpecialStation = () => new SpecialStation('Full Transcontinental', 12, 1)



const BuildRailroadTrack: NextPage = () => {
    const [defaultPlayers, setDefaultPlayers] = useState<PlayerInterface[]>(getDefaultPlayers())
    const [defaultChicago, setDefaultChicago] = useState<SpecialStation>(getDefaultChicago())
    const [defaultFiveDollarsCities, setDefaultFiveDollarsCities] = useState<SpecialStation[]>(getFiveDollarsCities())
    const [defaultTranscontinental, setDefaultTranscontinental] = useState<SpecialStation>(getTranscontinental())
    const [defaultFullTranscontinental, setDefaultFullTranscontinental] = useState<SpecialStation>(getFullTranscontinental())

    const [players, chicago, fiveDollarsCities, transcontinental, fullTranscontinental, 
        setPlayersStored, setChicagoStored, setFiveDollarsCityStored, setTranscontinentalStored] = 
        useStore((state) => [
            state.players, state.chicago, state.fiveDollarsCities, state.transcontinental, state.fullTranscontinental,
            state.setPlayers, state.setChicago, state.setFiveDollarsCity, state.setTranscontinental
        ])

    const [specialPlayers, setSpecialPlayers] = useState<PlayerMoneyInterface[]>(getDefaultPlayersToPlay(defaultPlayers))

    const [specialStations, setSpecialStations] = useState<SpecialStationChecked[]>(getSpecialStations([defaultChicago, ...defaultFiveDollarsCities, defaultTranscontinental, defaultFullTranscontinental]))
    const [specialChicago, setSpecialChicago] = useState<SpecialStationChecked>(SpecialStationChecked.getSpecialStation(specialStations, defaultChicago.name))
    const [specialFiveDollarsCities, setSpecialFiveDollarsCities] = useState<SpecialStationChecked[]>(defaultFiveDollarsCities.map(f => SpecialStationChecked.getSpecialStation(specialStations, f.name)))
    const [specialTranscontinental, setSpecialTranscontinental] = useState<SpecialStationChecked>(SpecialStationChecked.getSpecialStation(specialStations, defaultTranscontinental.name))
    const [specialFullTranscontinental, setSpecialFullTranscontinental] = useState<SpecialStationChecked>(SpecialStationChecked.getSpecialStation(specialStations, defaultFullTranscontinental.name))

    const [playingIndex, setPlayingIndex] = useState<number>(0)

    const setAllSpecialStations = () => {
        setSpecialChicago(SpecialStationChecked.getSpecialStation(specialStations, defaultChicago.name))
        setSpecialFiveDollarsCities(defaultFiveDollarsCities.map(f => SpecialStationChecked.getSpecialStation(specialStations, f.name)))
        setSpecialTranscontinental(SpecialStationChecked.getSpecialStation(specialStations, defaultTranscontinental.name))
        setSpecialFullTranscontinental(SpecialStationChecked.getSpecialStation(specialStations, defaultFullTranscontinental.name))
    }

    const onSpecialStationClick = (event: any, station: SpecialStation) => {
        event.preventDefault()

        const stationClicked = SpecialStationChecked.getSpecialStation(specialStations, station.name)
        if(station.isFull() || !stationClicked) return

        const player = specialPlayers[playingIndex]

        if(stationClicked.playerIndeces.includes(playingIndex)){
            player.moneys -= stationClicked.moneys
            stationClicked.playerIndeces = stationClicked.playerIndeces.filter(i => playingIndex !== i)
        }
        else{
            if(stationClicked.limitation && stationClicked.limitation === stationClicked.achievedPlayers.length + stationClicked.playerIndeces.length) return
            player.moreMoneys += stationClicked.moneys
            stationClicked.playerIndeces.push(playingIndex)
        }

        setSpecialPlayers(specialPlayers.map((p, i) => i === playingIndex ? player : p))
        setSpecialStations(specialStations.map(s => s.id === stationClicked.id ? stationClicked : s))
    }


    const previousPlayer = (event: any) => {
        event.preventDefault()
        if(playingIndex !== 0) setPlayingIndex(playingIndex - 1)
    }

    const nextPlayer = (event: any) => {
        event.preventDefault()
        if(playingIndex === defaultPlayers.length) return nextPhase()
        setPlayingIndex(playingIndex + 1)
    }

    const nextPhase = () => {

    }

    
    
    return (
        <>
        <div className="flex flex-col min-h-screen max-h-screen">
            <h2 className="self-center py-20">BUILD RAILROAD TRACK</h2>
            <TurnOrderMoneyComponent players={specialPlayers} inPlay={playingIndex} />
            <div className="flex-grow flex flex-col justify-evenly">
                <SpecialStationComponent station={specialChicago} playingIndex={playingIndex} onClick={(e: any) => onSpecialStationClick(e, defaultChicago)}/>
                <div className="flex flex-row justify-evenly content-evenly">
                    {
                        specialFiveDollarsCities.map((fdc, i) => <SpecialStationComponent key={i} station={fdc} playingIndex={playingIndex} onClick={(e:any) => onSpecialStationClick(e, fdc)}/>)
                    }
                </div>
                <div className="flex flex-row justify-evenly content-evenly">
                    {
                        [specialTranscontinental, specialFullTranscontinental].map((t, i) => <SpecialStationComponent key={i} station={t} playingIndex={playingIndex} onClick={(e:any) => onSpecialStationClick(e, t)}/>)
                    }
                </div>
            </div>
            <PreviousNextComponent hasNext={true} hasPrevious={playingIndex !== 0} onNextClick={nextPlayer} onPreviousClick={previousPlayer} />
        </div>
        </>
    )
}

export default BuildRailroadTrack