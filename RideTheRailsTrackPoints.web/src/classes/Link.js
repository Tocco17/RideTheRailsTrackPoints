import { Locomotives } from "./Locomotive"

export class Link {
    constructor(hexes, firstLocomotive, secondLocomotive) {
        this.hexes = hexes
        this.firstLocomotive = Locomotives[firstLocomotive]
        this.secondLocomotive = Locomotives[secondLocomotive]
    }
}