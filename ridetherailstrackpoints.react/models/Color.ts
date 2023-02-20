import ColorInterface from "@/interfaces/ColorInterface"

export default class Color implements ColorInterface{
    public name: string
    public hex: string

    constructor(name: string, hex: string){
        this.name = name
        this.hex = hex
    }
}

export const Colors = {
    //Plain white
    None: new Color('None', '#ffffff'),
    //All colors dedicated for the players
    Player: {
        white: new Color('white', '#ffffff'),
        cyan: new Color('cyan', '#22abb5'),
        pink: new Color('pink', '#af6ce6'),
        green: new Color('green', '#17de14'),
        red: new Color('red', '#390961'),
    },
    //All colors dedicated for the locomotives
    Locomotive: {
        // black: new Color('black', '#000000'),
        black: new Color('black', '#606060'),
        purple: new Color('purple', '#2b00ff'),
        yellow: new Color('yellow', '#f2ff00'),
        orange: new Color('orange', '#ff6a00'),
        blue: new Color('blue', '#003cff'),
        red: new Color('red', '#ff1100'),
    },
}