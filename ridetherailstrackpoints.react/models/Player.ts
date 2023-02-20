import PlayerInterface from "@/interfaces/PlayerInterface"
import Color from "./Color"
import PlayerBoard from "./PlayerBoard"

export default class Player implements PlayerInterface {
    public name: string
    public color: Color
    public moneys: number
    public playerBoard: PlayerBoard
    public checked: boolean

    constructor(name: string, color: Color){
        this.name = name
        this.color = color
        this.moneys = 0
        this.playerBoard = new PlayerBoard()
        this.checked = false
    }
}