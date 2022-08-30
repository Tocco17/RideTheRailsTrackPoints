import { Player } from "./Player"

export class Game {
    constructor(numberOfPlayers) {
        this.NumberOfPlayers = numberOfPlayers
        this.Players = CreatePlayerList(numberOfPlayers)
    }
}

CreatePlayerList(numberOfPlayers) {
    players = []

    for (let i = 0; i < numberOfPlayers; i++) {

        const player = new Player()
    }

    return players
}