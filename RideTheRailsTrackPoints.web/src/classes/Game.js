import { shuffle } from "../utils/Randomize"
import { Colors } from "./Color"
import { Player } from "./Player"
import { SpecialStation } from "./SpecialStation"
import { Transcontinental } from "./Transcontinental"

export class Game {
    constructor(numberOfPlayers) {
        this.numberOfPlayers = numberOfPlayers
        this.players = []

        for (let i = 0; i < numberOfPlayers; i++) {
            this.players.push(new Player(Colors.None))
        }

        this.turnOrder = []

        this.fiveDollarsCities = {
            Kansas: new SpecialStation('Kansas', 5),
            NewYork: new SpecialStation('NewYork', 5),
            LosAngeles: new SpecialStation('LosAngeles', 5),
            Hollywood: new SpecialStation('Hollywood', 5),
        }
        this.chicago = new SpecialStation('Chicago', 2, true)
        this.transcontinental = new Transcontinental()
    }

    newGame() {
        let indexPlayers = shuffle([...Array(this.numberOfPlayers).keys()])
        this.turnOrder = this.players.map((p, i) => this.players[indexPlayers[i]])
    }

    newTurn() {
        this.turnOrder = this.players.sort((a, b) => (a.points > b.points ? 1 : -1))
    }

    takeAShare(player, locomotive) {
        player.takeAShare(locomotive)
    }


    rideTheRails(player, railroad) {
        const activePlayer = player.getColor()

        this.players.forEach(p => {
            p.rideTheRails(railroad, p.isEqual(activePlayer))
        })
    }

}