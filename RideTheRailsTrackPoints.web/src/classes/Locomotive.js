import { Colors } from "./Color"

/*
Locomotive
*/
export class Locomotive {
    constructor(name) {
        this.name = name //Name
        this.color = Colors.Locomotive[name] //Color
    }
}

/*
Locomotives available in the game
*/
export const Locomotives = {
    black: new Locomotive("black"),
    purple: new Locomotive("purple"),
    yellow: new Locomotive("yellow"),
    orange: new Locomotive("orange"),
    blue: new Locomotive("blue"),
    red: new Locomotive("red"),
}