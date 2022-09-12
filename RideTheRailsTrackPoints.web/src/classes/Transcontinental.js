import { Player } from "./Player"

/*
Special goal that can be achieved during a match
*/
export class Transcontinental {
    constructor() {
        this.name = 'Transcontinental' //Name
        this.fullPoints = 12 //Maximum points it can give
        this.points = 8 //Minimum points it can give
        this.achievedPlayer = null //Player that achived this goal
        this.takeable = true //If it's still available
    }

    // isTakeable() {
    //     return this.takeable
    // }

    // take(player, isFull) {
    //     if (!this.isTakeable()) return

    //     this.achievedPlayer = player
    //     this.takeable = false

    //     const points = isFull ? this.fullPoints : this.points
    //     player.score(points)
    // }
}