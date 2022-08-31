import { shuffle } from "../utils/Randomize"
import { Colors } from "./Color"
import { Player } from "./Player"
import { SpecialStation } from "./SpecialStation"
import { Transcontinental } from "./Transcontinental"

export class Game {
    constructor(numberOfPlayers) {
        this.NumberOfPlayers = numberOfPlayers
        this.Players = []

        for (let i = 0; i < numberOfPlayers; i++) {
            this.Players.push(new Player(Colors.None))
        }

        this.TurnOrder = []

        this.FiveDollarsCities = {
            Kansas: new SpecialStation('Kansas', 5),
            NewYork: new SpecialStation('NewYork', 5),
            LosAngeles: new SpecialStation('LosAngeles', 5),
            Hollywood: new SpecialStation('Hollywood', 5),
        }
        this.Chicago = new SpecialStation('Chicago', 2, true)
        this.Transcontinental = new Transcontinental()
    }

    newGame() {
        let indexPlayers = shuffle([...Array(this.NumberOfPlayers).keys()])
        this.TurnOrder = this.Players.map((p, i) => this.Players[indexPlayers[i]])
    }

    newTurn() {
        this.TurnOrder = this.Players.sort((a, b) => (a.Points > b.Points ? 1 : -1))
    }

    takeAShare(player, locomotive) {
        player.takeAShare(locomotive)
    }


    rideTheRails(player, railroad) {
        const activePlayer = player.getColor()

        this.Players.forEach(p => {
            p.rideTheRails(railroad, p.isEqual(activePlayer))
        })
    }

}