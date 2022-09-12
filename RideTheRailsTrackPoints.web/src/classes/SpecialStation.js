/*
Special station that will give some points
*/
export class SpecialStation {
    constructor(name, points, alwaysTakeable) {
        this.name = name //Name of the station
        this.points = points //Number of points it will give
        this.achievedPlayer = null //Player that achieved this station
        this.takeable = true //If it's still available
        this.alwaysTakeable = !!alwaysTakeable //If it's always available
    }

    // isTakeable() {
    //     return this.alwaysTakeable || this.takeable
    // }

    // take(player) {
    //     if (!this.IsTakeable()) return

    //     this.achievedPlayer = player
    //     this.takeable = false

    //     player.score(this.points)
    // }

    // noMoreAvailable() {
    //     this.takeable = false
    // }
}