import { Colors } from "./Color"
import { PlayerBoard } from "./PlayerBoard"

export class Player {
    constructor(name, color) {
        this.name = name
        this.color = Colors.Player[color]
        this.points = 0
        this.board = new PlayerBoard()
    }

    getColor() {
        return this.color.name
    }

    isEqual(name) {
        return this.getColor() === name
    }

    score(points) {
        this.points += points
    }

    takeAShare(locomotive) {
        this.board[locomotive].takeAShare()
    }

    rideTheRails(railroad, isActivePlayer) {
        if (isActivePlayer) this.points += railroad.links.Length + 1
        this.points += this.board.totalPoints(railroad.links)
    }
}