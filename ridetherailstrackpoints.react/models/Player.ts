import Color from "./Color"
import PlayerBoard from "./PlayerBoard"

export default class Player {
    public name: string
    public color: Color
    public moneys: number
    public playerBoard: PlayerBoard

    constructor(name: string, color: Color){
        this.name = name
        this.color = color
        this.moneys = 0
        this.playerBoard = new PlayerBoard()
    }
}