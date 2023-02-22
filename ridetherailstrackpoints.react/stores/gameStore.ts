import PlayerInterface from '@/interfaces/PlayerInterface'
import { create } from 'zustand'

interface ContextStore {
    players: PlayerInterface[]
    round: number
    setPlayers: (players: PlayerInterface[]) => void
    setRound: (round: number) => void
}

const useStore = create<ContextStore>()((set) => ({
    players: [],
    round: 0,
    setPlayers: (players) => set({players: players}),
    setRound: (round) => set({round: round})
}))

export default useStore