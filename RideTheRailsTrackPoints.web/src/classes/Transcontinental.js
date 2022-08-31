import { Player } from "./Player"

export class Transcontinental {
    constructor() {
        this.Name = 'Transcontinental'
        this.FullPoints = 12
        this.Points = 8
        this.AchievedPlayer = null
        this.Takeable = true
    }

    isTakeable() {
        return this.Takeable
    }

    take(player, isFull) {
        if (!this.isTakeable()) return

        this.AchievedPlayer = player
        this.Takeable = false

        const points = isFull ? this.FullPoints : this.Points
        player.score(points)
    }
}