import { Colors } from "./Color"

export class Locomotive {
    constructor(name) {
        this.name = name
        this.color = Colors.Locomotive[name]
    }
}

export const Locomotives = {
    black: new Locomotive("black"),
    purple: new Locomotive("purple"),
    yellow: new Locomotive("yellow"),
    orange: new Locomotive("orange"),
    blue: new Locomotive("blue"),
    red: new Locomotive("red"),
}