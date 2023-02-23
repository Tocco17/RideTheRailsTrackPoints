import SpecialStation from "./SpecialStation"

export default class SpecialStationChecked extends SpecialStation {
    public id: number
    public playerIndeces: number[]

    constructor(name: string, moneys: number, limitation?: number){
        super(name, moneys, limitation)
        this.id = 0
        this.playerIndeces = []
        this.isFull = SpecialStation.prototype.isFull
    }

    
    public isCheck = (playerIndex: number) => this.playerIndeces.includes(playerIndex)

    public isCurrentlyFull = () => !!this.limitation && this.limitation === this.playerIndeces.length + this.achievedPlayers.length

    public static getSpecialStation = (stations: SpecialStationChecked[], name: string) => stations.find(s => s.name === name) ?? new SpecialStationChecked(name, 0)
}