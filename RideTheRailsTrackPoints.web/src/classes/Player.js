import { Color } from "./Color"
import { PlayerBoard } from "./PlayerBoard"

export class Player {
    constructor(color) {
        this.Color = color
        this.Points = 0
        this.Board = new PlayerBoard()
    }
}