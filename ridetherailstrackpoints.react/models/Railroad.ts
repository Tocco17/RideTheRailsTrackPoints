import Color from "./Color"

export default class Railroad {
    public name: string
    public color: Color

    constructor(name: string, color: Color){
        this.name = name
        this.color = color
    }
}