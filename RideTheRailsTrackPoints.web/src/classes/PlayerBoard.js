import { Locomotives } from "./Locomotive";
import { SharedRailroadTracker } from "./SharedRailroadTracker"

export class PlayerBoard {
    constructor() {
        this.tracks = [
            new SharedRailroadTracker(Locomotives.red.name, 6),
            new SharedRailroadTracker(Locomotives.blue.name, 6),
            new SharedRailroadTracker(Locomotives.orange.name, 5),
            new SharedRailroadTracker(Locomotives.yellow.name, 4),
            new SharedRailroadTracker(Locomotives.purple.name, 3),
            new SharedRailroadTracker(Locomotives.black.name, 2),
        ]
    }

    getTrack(name) {
        return this.tracks.find(t => t.locomotive.name === name)
    }

    takeAShare(name) {
        this.getTrack(name).takeAShare()
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