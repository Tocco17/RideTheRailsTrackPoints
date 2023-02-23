import PlayerInterface from '@/interfaces/PlayerInterface'
import SpecialStation from '@/models/SpecialStation'
import { create } from 'zustand'

type SetType = (partial: ContextStore | Partial<ContextStore> | ((state: ContextStore) => ContextStore | Partial<ContextStore>), replace?: boolean | undefined) => void

interface ContextStore {
    players: PlayerInterface[]
    round: number
    chicago: SpecialStation
    fiveDollarsCities: SpecialStation[]
    transcontinental: SpecialStation
    fullTranscontinental: SpecialStation
    setPlayers: (players: PlayerInterface[]) => void
    setRound: (round: number) => void
    setChicago: (player: PlayerInterface) => void
    setFiveDollarsCity: (player: PlayerInterface, station: SpecialStation) => void
    setTranscontinental: (player: PlayerInterface, isFull: boolean) => void
}

const chicago = new SpecialStation('Chicago', 5)
const fiveDollarsCities = [
    new SpecialStation('Kansas', 5, 1),
    new SpecialStation('New York', 5, 1),
    new SpecialStation('Los Angeles', 5, 1),
    new SpecialStation('Hollywood', 5, 1),
]
const transcontinental = new SpecialStation('Transcontinental', 8, 1)
const fullTranscontinental = new SpecialStation('Full Transcontinental', 12, 1)

const giveSpecialStationMoneys = (player: PlayerInterface, station: SpecialStation) => {
    if(!station.isFull()){
        player.moneys += station.moneys
        station.addPlayer(player)
    }

    return {
        player,
        station
    }
}

const setChicago = (state: ContextStore, player: PlayerInterface) => {
    const recalculated = giveSpecialStationMoneys(player, state.chicago)    

    return {
        player: recalculated.player,
        chicago: recalculated.station
    }
}

const setFiveDollarsCity = (state: ContextStore, player: PlayerInterface, station: SpecialStation) => {
    const recalculated = giveSpecialStationMoneys(player, station)
    return {
        player: recalculated.player,
        fiveDollarsCities: state.fiveDollarsCities.map(f => f.name === station.name ? station : f)
    }
}

const setTranscontinental = (state: ContextStore, player: PlayerInterface, isFull: boolean) => {
    const recalculated = giveSpecialStationMoneys(player, isFull ? state.fullTranscontinental : state.transcontinental)

    const toStore = {
        player: recalculated.player,
        transcontinental: !isFull ? recalculated.station : state.transcontinental,
        fullTranscontinental: isFull ? recalculated.station : state.fullTranscontinental,
    }

    if(isFull) toStore.transcontinental.addPlayer(player)
    else toStore.fullTranscontinental.addPlayer(player)
    
    return {
        player: recalculated.player,
        transcontinental: toStore.transcontinental,
        fullTranscontinental: toStore.fullTranscontinental,
    }
}

const useStore = create<ContextStore>()((set) => ({
    players: [],
    round: 0,
    chicago,
    fiveDollarsCities,
    transcontinental,
    fullTranscontinental,
    setPlayers: (players) => set({players: players}),
    setRound: (round) => set({round: round}),
    setChicago: (player: PlayerInterface) => set((state) => setChicago(state, player)),
    setFiveDollarsCity: (player: PlayerInterface, station: SpecialStation) => set((state) => setFiveDollarsCity(state, player, station)),
    setTranscontinental: (player: PlayerInterface, isFull: boolean) => set((state) => setTranscontinental(state, player, isFull))
}))

export default useStore