import { Colors } from "./Color";
import { SharedRailroadTracker } from "./SharedRailroadTracker";

export class PlayerBoard {
    constructor() {
        this.Black = new SharedRailroadTracker(Colors.SharedTracker.Black, 2)
        this.Purple = new SharedRailroadTracker(Colors.SharedTracker.Purple, 3)
        this.Yellow = new SharedRailroadTracker(Colors.SharedTracker.Yellow, 4)
        this.Orange = new SharedRailroadTracker(Colors.SharedTracker.Orange, 5)
        this.Blue = new SharedRailroadTracker(Colors.SharedTracker.Blue, 6)
        this.Red = new SharedRailroadTracker(Colors.SharedTracker.Red, 6)
    }
}