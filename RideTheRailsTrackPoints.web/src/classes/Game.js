import { shuffle } from "../utils/Randomize"
import { Colors } from "./Color"
import { Player } from "./Player"
import { SpecialStation } from "./SpecialStation"

export class Game {
    constructor(numberOfPlayers) {
        this.NumberOfPlayers = numberOfPlayers
        this.Players = []

        for (let i = 0; i < numberOfPlayers; i++) {
            this.Players.push(new Player(Colors.None))
        }

        this.TurnOrder = []

        this.SpecialCities = {
            Kansas: new SpecialStation('Kansas', 5),
            NewYork: new SpecialStation('NewYork', 5),
            LosAngeles: new SpecialStation('LosAngeles', 5),
            Chicago: new SpecialStation('Chicago', 5),
        }

        this.FullTranscontinental = new SpecialStation('FullTranscontinental', 12)
        this.Transcontinental = new SpecialStation('Transcontinental', 8)
    }

    newGame(){
        let indexPlayers = shuffle([...Array(this.NumberOfPlayers).keys()])
        this.TurnOrder = this.Players.map((p, i) => this.Players[indexPlayers[i]])
    }

    newTurn(){
        this.TurnOrder = this.Players.sort((a, b) => (a.Points > b.Points ? 1 : -1))
    }

    
}