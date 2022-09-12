import { Colors } from "./Color"
import { PlayerBoard } from "./PlayerBoard"

/*
Player
*/
export class Player {
    constructor(name, color, check, turnOrder) {
        this.name = name
        this.color = typeof color === 'string' ? Colors.Player[color] : color
        this.check = !!check
        this.turnOrder = turnOrder
        this.points = 0
        this.playerboard = new PlayerBoard()
    }

    /*
    Insert the selected share in the playerboard
    The locomotive must be valorized with the name of the wanted locomotive
    */
    takeAShare(locomotive) {
        this.playerboard.takeAShare(locomotive)
    }

    // getColor() {
    //     return this.color.name
    // }

    // isEqual(name) {
    //     return this.getColor() === name
    // }

    // score(points) {
    //     this.points += points
    // }


    // rideTheRails(railroad, isActivePlayer) {
    //     if (isActivePlayer) this.points += railroad.links.Length + 1
    //     this.points += this.board.totalPoints(railroad.links)
    // }
}