import { Locomotives } from "./Locomotive";
import { SharedRailroadTracker } from "./SharedRailroadTracker"

export class PlayerBoard {
    constructor() {
        this.black = new SharedRailroadTracker(Locomotives.black, 2)
        this.purple = new SharedRailroadTracker(Locomotives.purple, 3)
        this.yellow = new SharedRailroadTracker(Locomotives.yellow, 4)
        this.orange = new SharedRailroadTracker(Locomotives.orange, 5)
        this.blue = new SharedRailroadTracker(Locomotives.blue, 6)
        this.red = new SharedRailroadTracker(Locomotives.red, 6)
    }

    totalPoints(links) {
        const length = links.length
        return links.reduce((points, link) => {
            points += sharePoints(link.firstLocomotive)
            points += sharePoints(link.secondLocomotive)
        }, 0)
    }

    sharePoints(locomotive) {
        if (!locomotive) return 0

        return this[locomotive.name].shared * length
    }
}