export class SpecialStation {
    constructor(name, points, alwaysTakeable) {
        this.name = name
        this.points = points
        this.achievedPlayer = null
        this.takeable = true
        this.alwaysTakeable = !!alwaysTakeable
    }

    isTakeable() {
        return this.alwaysTakeable || this.takeable
    }

    take(player) {
        if (!this.IsTakeable()) return

        this.achievedPlayer = player
        this.takeable = false

        player.score(this.points)
    }

    noMoreAvailable() {
        this.takeable = false
    }
}