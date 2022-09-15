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

    /*
    Gives points to the player
    */
    score(points) {
        this.points += points
    }

    /*
    Points are reducted by the amount specified
    */
    untakePoints(points) {
        this.points -= points
    }

    /*
    Get the color name of the player
    */
    getColor() {
        return this.color.name
    }

    /*
    Checks if this player is the same as another one
    */
    isEqualTo(player) {
        return this.getColor() === player.getColor()
    }

    /*
    Calculate the total points taken in the Ride The Rails phase
     */
    getRideTheRailsPoints(railroads, isActivePlayer) {
        let rideTheRailsPoints = this.playerboard.totalPoints(railroads)

        let activePlayerPoints = 0
        if (isActivePlayer) activePlayerPoints = railroads.reduce((result, rail) => result += rail.clicked, 0)
        if (activePlayerPoints) rideTheRailsPoints += activePlayerPoints + 1

        return rideTheRailsPoints
    }

    /*
    Adds the Ride The Rails Points
    */
    rideTheRails(railroads, isActivePlayer) {
        this.points += this.getRideTheRailsPoints(railroads, isActivePlayer)
    }
}