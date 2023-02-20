import { Colors } from "./Color";
import SharedRailroad from "./SharedRailroad";

export default class PlayerBoard {
    public sharedRailroads: SharedRailroad[]

    constructor(){
        this.sharedRailroads = [
            new SharedRailroad(Colors.Locomotive.red, 6),
            new SharedRailroad(Colors.Locomotive.blue, 6),
            new SharedRailroad(Colors.Locomotive.orange, 5),
            new SharedRailroad(Colors.Locomotive.yellow, 4),
            new SharedRailroad(Colors.Locomotive.purple, 3),
            new SharedRailroad(Colors.Locomotive.black, 2),
        ]
    }

    public add(locomotive: string) {
        let indexChanged = -1

        this.sharedRailroads = this.sharedRailroads.map((s, i) => {
            if(s.color.name === locomotive || s.taken < s.limitation){ 
                s.taken++
                indexChanged = i
            }
            return s
        })

        return indexChanged
    }

    public remove(locomotive: string) {
        let indexChanged = -1
        
        this.sharedRailroads = this.sharedRailroads.map((s, i) => {
            if(s.color.name === locomotive || s.taken < s.limitation){ 
                s.taken--
                indexChanged = i
            }
            return s
        })

        return indexChanged
    }
}