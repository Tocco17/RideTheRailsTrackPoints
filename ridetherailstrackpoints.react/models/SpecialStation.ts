import Player from "./Player"

export default class SpecialStation {
    public name: string
    public moneys: number
    public limitation?: number
    public achievedPlayers: Player[]

    constructor(name: string, moneys: number, limitation?: number){
        this.name = name
        this.moneys = moneys
        this.limitation = limitation
        this.achievedPlayers = []
    }

    public addPlayer(player: Player){
        if(this.isFull()){
            console.error(`Impossible to insert a new player for the ${this.name} special station`)
            return
        }

        this.achievedPlayers.push(player)
    }

    public isFull(){
        return this.limitation && this.achievedPlayers.length === this.limitation
    }

    public left(){
        return this.limitation ? this.limitation - this.achievedPlayers.length : undefined
    }

    
}