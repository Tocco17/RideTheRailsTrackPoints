import { Player } from "./Player"

export class Transcontinental {
    constructor() {
        this.name = 'Transcontinental'
        this.fullPoints = 12
        this.points = 8
        this.achievedPlayer = null
        this.takeable = true
    }

    isTakeable() {
        return this.takeable
    }

    take(player, isFull) {
        if (!this.isTakeable()) return

        this.achievedPlayer = player
        this.takeable = false

        const points = isFull ? this.fullPoints : this.points
        player.score(points)
    }
}