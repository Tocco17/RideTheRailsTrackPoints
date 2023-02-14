import Color from "./Color";

export default class SharedRailroad {
    public color: Color
    public limitation: number
    public taken: number

    constructor(color: Color, limitation: number){
        this.color = color
        this.limitation = limitation
        this.taken = 0
    }
}