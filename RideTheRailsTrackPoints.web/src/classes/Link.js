import { Locomotives } from "./Locomotive"

/*
Railroad that links two cities
It can contains only two kinds of locomotives
*/
export class Link {
    constructor(hexes, firstLocomotive, secondLocomotive) {
        this.hexes = hexes //Number of hexes occupied
        this.firstLocomotive = Locomotives[firstLocomotive] //Obliged locomotive
        this.secondLocomotive = Locomotives[secondLocomotive] //Optional locomotive
    }
}