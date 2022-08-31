import { Locomotives } from "./Locomotive";
import { SharedRailroadTracker } from "./Sh./SharedRailroadTracker"

export class PlayerBoard {
    constructor() {
        this.Black = new SharedRailroadTracker(Locomotives.Black, 2)
        this.Purple = new SharedRailroadTracker(Locomotives.Purple, 3)
        this.Yellow = new SharedRailroadTracker(Locomotives.Yellow, 4)
        this.Orange = new SharedRailroadTracker(Locomotives.Orange, 5)
        this.Blue = new SharedRailroadTracker(Locomotives.Blue, 6)
        this.Red = new SharedRailroadTracker(Locomotives.Red, 6)
    }

    totalPoints(links) {
        const length = links.length
        return links.reduce((points, link) => {
            points += sharePoints(link.FirstLocomotive)
            points += sharePoints(link.SecondLocomotive)
        }, 0)
    }

    sharePoints(locomotive) {
        if (!locomotive) return 0

        return this[locomotive.Name].Shared * length
    }
}