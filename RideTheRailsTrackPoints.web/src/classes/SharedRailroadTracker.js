import { Color } from "./Color"
import { Locomotives } from "./Locomotive"

export class SharedRailroadTracker {
    constructor(name, maxElements) {
        this.locomotive = Locomotives[name]
        this.maxSharedElements = maxElements
        this.shared = 0
        this.spaces = []

        for (let i = 0; i < maxElements; i++) {
            this.spaces.push(new RailroadSpace(i))
        }
    }

    takeAShare() {
        if (this.shared == this.maxSharedElements) {
            console.error('Already reached maximum capacity')
            return
        }

        this.shared++

            const lastShared = this.spaces.filter(s => s.check).length
        this.spaces[lastShared].check = true
    }
}

class RailroadSpace {
    constructor(index) {
        this.index = index
        this.check = false
    }
}