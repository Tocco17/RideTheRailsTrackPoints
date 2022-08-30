import { Color } from "./Color"

export class SharedRailroadTracker {
    constructor(color, maxElements) {
        this.Color = color
        this.MaxSharedElements = maxElements
        this.Shared = 0
    }

    Add() {
        if (this.Shared == this.MaxSharedElements) {
            console.error('Already reached maximum capacity')
            return
        }

        this.Shared++
    }
}