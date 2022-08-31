import { Colors } from "./Color"
import { PlayerBoard } from "./PlayerBoard"

export class Player {
    constructor(name, color) {
        this.Name = name
        this.Color = Colors.Player[color]
        this.Points = 0
        this.Board = new PlayerBoard()
    }

    getColor() {
        return this.Color.Name
    }

    isEqual(name) {
        return this.getColor() === name
    }

    score(points) {
        this.Points += points
    }

    takeAShare(locomotive) {
        this.Board[locomotive].takeAShare()
    }

    rideTheRails(railroad, isActivePlayer) {
        if (isActivePlayer) this.Points += railroad.Links.Length + 1
        this.Points += this.Board.totalPoints(railroad.Links)
    }
}