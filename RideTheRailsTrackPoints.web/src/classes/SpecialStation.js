/*
Special station that will give some points
*/
export class SpecialStation {
    constructor(name, points) {
        this.name = name //Name of the station
        this.points = points //Number of points it will give
        this.check = false //To see if it's checked
        this.achievedPlayer = null //Player that achieved this station
        this.available = true //If it's still available
    }

    /*
    It toggles the goal, from taken to takeable and viceversa
    */
    toggle(player) {
        this.check ? this.untake(player) : this.take(player)
    }

    /*
    The goal is taken by the specified player
    If it's a complete take than it's no more available
    */
    take(player, isComplete) {
        if (!this.available) return

        this.check = true
        this.achievedPlayer = player
        if (isComplete) this.available = false

        player.score(this.points)
    }

    /*
    The city becomes available
    */
    untake(player) {
        this.check = false
        this.achievedPlayer = null
        this.available = true
        player.untakePoints(this.points)
    }

    // noMoreAvailable() {
    //     this.available = false
    // }
}

export function createChicago() {
    let chicago = new SpecialStation('Chicago', 2)

    chicago.take = function(player) {
        if (!this.available) return

        this.check = true
        this.achievedPlayer.push(player)
        player.score(this.points)
    }

    chicago.untake = function(player) {
        if (!this.check) return

        this.check = false
            //It removes only one occasion of the player
        this.achievedPlayer.pop()
        this.available = true
        player.untakePoints(this.points)
    }

    return chicago
}