import { Locomotives } from "./Locomotive"

export class Link {
    constructor(hexes, firstLocomotive, secondLocomotive) {
        this.Hexes = hexes
        this.FirstLocomotive = Locomotives[firstLocomotive]
        this.SecondLocomotive = Locomotives[secondLocomotive]
    }
}