export class Color {
    constructor(name, hex) {
        this.Name = name
        this.Hex = hex
    }
}

export const Colors = {
    None: new Color('None', 1),
    Player: {
        White: new Color('White', '#ffffff'),
        Cyan: new Color('Cyan', '#22abb5'),
        Pink: new Color('Pink', '#af6ce6'),
        Green: new Color('Green', '#17de14'),
        Red: new Color('Red', '#390961'),
        getColor
    },
    Locomotive: {
        Black: new Color('Black', 1),
        Purple: new Color('Purple', 1),
        Yellow: new Color('Yellow', 1),
        Orange: new Color('Orange', 1),
        Blue: new Color('Blue', 1),
        Red: new Color('Red', 1),
        getColor
    },
}

function getColor(index) {
    const propertiesNumber = Object.keys(this).length - 1

    if (!index) index = Math.floor(Math.random() * propertiesNumber) + 1
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