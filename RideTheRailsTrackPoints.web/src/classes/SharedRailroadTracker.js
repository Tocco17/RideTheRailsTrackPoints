import { Color } from "./Color"
import { Locomotives } from "./Locomotive"

export class SharedRailroadTracker {
    constructor(name, maxElements) {
        this.locomotive = Locomotives[name]
        this.maxSharedElements = maxElements
        this.shared = 0
    }

    takeAShare() {
        if (this.shared == this.maxSharedElements) {
            console.error('Already reached maximum capacity')
            return
        }

        this.shared++
    }
}