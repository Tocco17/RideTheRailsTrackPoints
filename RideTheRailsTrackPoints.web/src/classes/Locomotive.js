import { Colors } from "./Color"

export class Locomotive {
    constructor(name) {
        this.Name = name
        this.Color = Colors.Locomotive[name]
    }
}

export const Locomotives = {
    Black: new Locomotive("Black"),
    Purple: new Locomotive("Purple"),
    Yellow: new Locomotive("Yellow"),
    Orange: new Locomotive("Orange"),
    Blue: new Locomotive("Blue"),
    Red: new Locomotive("Red"),
}