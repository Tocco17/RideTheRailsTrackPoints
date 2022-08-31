import { Color } from "./Color"
import { Locomotives } from "./Locomotive"

export class SharedRailroadTracker {
    constructor(name, maxElements) {
        this.Locomotive = Locomotives[name]
        this.MaxSharedElements = maxElements
        this.Shared = 0
    }

    takeAShare() {
        if (this.Shared == this.MaxSharedElements) {
            console.error('Already reached maximum capacity')
            return
        }

        this.Shared++
    }
}