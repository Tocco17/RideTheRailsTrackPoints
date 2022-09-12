export class Color {
    constructor(name, hex) {
        this.name = name
        this.hex = hex
    }
}

export const Colors = {
    None: new Color('None', 1),
    Player: {
        white: new Color('white', '#ffffff'),
        cyan: new Color('cyan', '#22abb5'),
        pink: new Color('pink', '#af6ce6'),
        green: new Color('green', '#17de14'),
        red: new Color('red', '#390961'),
        getColor
    },
    Locomotive: {
        black: new Color('black', '#000000'),
        purple: new Color('purple', '#2b00ff'),
        yellow: new Color('yellow', '#f2ff00'),
        orange: new Color('orange', '#ff6a00'),
        blue: new Color('blue', '#003cff'),
        red: new Color('red', '#ff1100'),
        getColor
    },
}

function getColor(index) {
    const propertiesNumber = Object.keys(this).length - 1

    if (!index && index !== 0) index = Math.floor(Math.random() * propertiesNumber) + 1
    else if (index >= propertiesNumber) {
        console.error('Exceeded element number')
        return
    }

    let count = 0
    for (const key in this) {
        if (count == index) return this[key]

        count++
    }
}