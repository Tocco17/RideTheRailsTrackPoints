export class SpecialStation {
    constructor(name, points, alwaysTakeable) {
        this.Name = name
        this.Points = points
        this.AchievedPlayer = null
        this.Takeable = true
        this.AlwaysTakeable = !!alwaysTakeable
    }

    isTakeable() {
        return this.AlwaysTakeable || this.Takeable
    }

    take(player) {
        if (!this.IsTakeable()) return

        this.AchievedPlayer = player
        this.Takeable = false

        player.score(this.Points)
    }

    noMoreAvailable() {
        this.Takeable = false
    }
}