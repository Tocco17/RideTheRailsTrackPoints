import { Locomotives } from "./Locomotive"

/*
It's a track in the playerboard
*/
export class SharedRailroadTracker {
    constructor(name, maxElements) {
        this.locomotive = Locomotives[name] //Locomotive of this track
        this.maxElements = maxElements //Maximum number of space for this track
        this.shared = 0 //Number of spaces occupied
        this.spaces = [] //Spaces

        //It valorize the spaces
        for (let i = 0; i < maxElements; i++) {
            this.spaces.push(new RailroadSpace(i))
        }
    }

    /*
    Take a share and check the 'leftest' unchecked space
    */
    takeAShare() {
        if (this.shared == this.maxElements) {
            console.error('Already reached maximum capacity')
            return
        }

        this.shared++;

        const lastShared = this.spaces.filter(s => s.check).length
        this.spaces[lastShared].check = true
    }
}

/*
It's a track's space for the playerboard tracker
*/
class RailroadSpace {
    constructor(index) {
        this.index = index
        this.check = false
    }
}