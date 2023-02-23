import SpecialStation from "./SpecialStation"

export default class SpecialStationChecked extends SpecialStation {
    public id: number
    public check: boolean
    public playerIndex: number[]

    constructor(name: string, moneys: number, limitation?: number){
        super(name, moneys, limitation)
        this.id = 0
        this.check = false
        this.playerIndex = []
        this.isFull = SpecialStation.prototype.isFull
    }

    public static getSpecialStation = (stations: SpecialStationChecked[], name: string) => stations.find(s => s.name === name) ?? new SpecialStationChecked(name, 0)
}