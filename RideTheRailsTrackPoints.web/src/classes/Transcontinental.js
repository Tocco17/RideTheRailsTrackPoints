import { Player } from "./Player"

/*
Special goal that can be achieved during a match
*/
export class Transcontinental {
    constructor() {
        this.name = 'Transcontinental' //Name
        this.fullPoints = 12 //Maximum points it can give
        this.points = 8 //Minimum points it can give
        this.check = false
        this.achievedPlayer = null //Player that achived this goal
        this.available = true //If it's still available
    }

    /*
    Toggle the goal in full mode
    */
    toggleFull(player) {
        this.check ? this.untake(player, this.fullPoints) : this.take(player, this.fullPoints)
    }

    /*
    Toggle the goal in normal mode
    */
    toggleNormal(player) {
        this.check ? this.untake(player, this.points) : this.take(player, this.points)
    }

    /*
    The goal is taken by the specified player
    If it's a complete take than it's no more available
    */
    take(player, points) {
        if (!this.available) return

        this.check = true
        this.achievedPlayer = player

        player.score(points)
    }

    /*
    The city becomes available
    */
    untake(player, points) {
        this.check = false
        this.achievedPlayer = null
        this.available = true
        player.untakePoints(points)
    }



    // isavailable() {
    //     return this.available
    // }

    // take(player, isFull) {
    //     if (!this.isavailable()) return

    //     this.achievedPlayer = player
    //     this.available = false

    //     const points = isFull ? this.fullPoints : this.points
    //     player.score(points)
    // }
}