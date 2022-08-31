export class SpecialStation{
	constructor(name, points){
		this.Name = name
		this.Points = points
		this.AchievedPlayer = null
		this.Takeable = true
	}

	IsTaken(){
		return !!this.AchievedPlayer
	}

	Take(player){
		this.AchievedPlayer = player
		this.Takeable = false
	}
}