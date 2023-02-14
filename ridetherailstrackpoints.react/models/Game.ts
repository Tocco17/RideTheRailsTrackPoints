import { Phase } from "./Phase";
import Player from "./Player";
import SpecialStation from "./SpecialStation";

export default class Game {
    public players: Player[]
    public phase: Phase
    public round: number
    public fiveDollarCities: SpecialStation[]
    public transcontinental: SpecialStation;
    public fullTranscontinental: SpecialStation;
    public chicago: SpecialStation;

    constructor(){
        this.players = []
        this.phase = Phase.NewGame
        this.round = 0

        this.fiveDollarCities = [
            new SpecialStation('Kansas', 5, 1),
            new SpecialStation('NewYork', 5, 1),
            new SpecialStation('LosAngeles', 5, 1),
            new SpecialStation('Hollywood', 5, 1),
        ]

        this.transcontinental = new SpecialStation('transcontinental', 8, 1)
        this.fullTranscontinental = new SpecialStation('Full Transcontinental', 12, 1)

        this.chicago = new SpecialStation('Chicago', 5, 6)
    }
}