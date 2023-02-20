import Color from "../models/Color"
import PlayerBoard from "../models/PlayerBoard"

export default interface PlayerInterface {
    name: string
    color: Color
    moneys: number
    playerBoard: PlayerBoard
}