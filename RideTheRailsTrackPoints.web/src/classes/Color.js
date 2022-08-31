export class Color {
    constructor(name, rgba) {
        this.Name = name
        this.RGBA = rgba
    }
}

export const Colors = {
    None: new Color('None', 1),
    Player: {
        White: new Color('White', 1),
        Cyan: new Color('Cyan', 1),
        Pink: new Color('Pink', 1),
        Green: new Color('Green', 1),
        Red: new Color('Red', 1),
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