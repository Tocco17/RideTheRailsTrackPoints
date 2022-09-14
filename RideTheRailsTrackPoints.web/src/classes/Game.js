import { shuffle } from "../utils/Randomize"
import { Colors } from "./Color"
import { Player } from "./Player"
import { createChicago, SpecialStation } from "./SpecialStation"
import { Transcontinental } from "./Transcontinental"

/*
All the basic properties and functionalities are stored here
*/
export class Game {
    constructor(players) {
        this.players = players //Players in the game
        this.phase = 1 //Active phase of the game
        this.round = 1 //Active round
        this.playerTurn = 0 //Index of the player in turn

        //Cities that will give 5 points
        this.fiveDollarsCities = [
            new SpecialStation('Kansas', 5),
            new SpecialStation('NewYork', 5),
            new SpecialStation('LosAngeles', 5),
            new SpecialStation('Hollywood', 5),
        ]

        //Special city
        this.chicago = createChicago()

        //Special achievable goal
        this.transcontinental = new Transcontinental()
    }

    /*
    Order the players in a random manner
    */
    newGame() {
        shuffle(this.players)
        this.manageTurnOrder()
    }

    /*
    Passes to the next player
    */
    nextTurn() {
        this.getPlayerInTurn().check = false
        if (this.playerTurn === this.players.length - 1) this.nextPhase()
        else this.playerTurn++;
        this.getPlayerInTurn().check = true
    }

    /*
    Passes to the next phase of the game
    */
    nextPhase() {
        this.playerTurn = 0
        if (this.phase === 3) this.nextRound()
        else this.phase++;
    }

    /*
    Order the players based on their points
    */
    nextRound() {
        this.round++;
        this.phase = 1
        this.players.sort((p1, p2) => p1.points > p2.points ? 1 : -1)
        this.manageTurnOrder()
    }

    /*
    Set the turnOrder property with the correct value
    */
    manageTurnOrder() {
        this.players.forEach((p, index) => {
            p.turnOrder = index
            p.check = index === 0
        })
        this.playerTurn = 0
    }

    /*
    Get the current active player
    */
    getPlayerInTurn() {
        return this.players[this.playerTurn]
    }

    // rideTheRails(player, railroad) {
    //     const activePlayer = player.getColor()

    //     this.players.forEach(p => {
    //         p.rideTheRails(railroad, p.isEqual(activePlayer))
    //     })
    // }

}