import { Colors } from "./Color";
import SharedRailroad from "./SharedRailroad";

export default class PlayerBoard {
    public SharedRailroads: SharedRailroad[]

    constructor(){
        this.SharedRailroads = [
            new SharedRailroad(Colors.Locomotive.black, 2),
            new SharedRailroad(Colors.Locomotive.purple, 3),
            new SharedRailroad(Colors.Locomotive.yellow, 4),
            new SharedRailroad(Colors.Locomotive.orange, 5),
            new SharedRailroad(Colors.Locomotive.blue, 6),
            new SharedRailroad(Colors.Locomotive.red, 6),
        ]
    }
}