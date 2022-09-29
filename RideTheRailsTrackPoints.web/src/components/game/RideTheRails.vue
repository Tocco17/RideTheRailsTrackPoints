<script>
import PlayerComponent from './PlayerComponent.vue';
import Color from './Color.vue';

export default {
    name: "rideTheRails",
    emits: ['railsRidden'],
    props: {
        players: {
            required: true
        },
        playerTurn: {
            required: true
        }
    },
    data() {
        let colors = [
            this.createColor('Black', '#000000'),
            this.createColor('Purple', '#2b00ff'),
            this.createColor('Yellow', '#f2ff00'),
            this.createColor('Orange', '#ff6a00'),
            this.createColor('Blue', '#003cff'),
            this.createColor('Red', '#ff1100'),
        ]
        let minus = this.createColor('Minus', '#ffffff')

        return {
            colors,
            minus
        }
    },
    methods: {
        createColor(name, hex) {
            return {
                name,
                hex,
                clicked: 0
            }
        },
        calculatePoints(player) {
            return `${player.name} -> + ${player.getRideTheRailsPoints(this.colors, player.turnOrder === this.playerTurn)}`
        },
        railsRidden() {
            this.players.forEach(p => {
                p.rideTheRails(this.colors, this.playerTurn === p.turnOrder)
            })

            this.colors.forEach(c => c.clicked = 0)

            this.$emit('railsRidden')
        }
    },
    computed: {
        minusText() {
            return '-'
        },
        areRailroadsAvailable() {
            return this.colors.reduce((result, color) => result += color.clicked, 0) < this.links.clicked
        },
        playerInTurn() {
            return this.players[this.playerTurn]
        },
    },
    components: { PlayerComponent, Color }
}
</script>
            
<template>
    <h2>RIDE THE RAILS</h2>

    <Color :color="playerInTurn.color" :check="true" :radius="'30px'"></Color>
    <label>Turn of {{playerInTurn.name}}</label>

    <ul>
        <li v-for="rail in colors">
            <Color v-if="rail.clicked !== 0" :radius="'10px'" :color="minus" :check="true" :text="minusText"
                @click="rail.clicked--">
            </Color>
            <Color :color="rail" :check="true" @click="rail.clicked++"></Color>
            <label>{{rail.name + '-' + rail.clicked}}</label>
        </li>
    </ul>

    <h3>POINTS TAKEN</h3>
    <ul>
        <li v-for="player in players">
            <Color :color="player.color" :check="true"></Color>
            <label>{{calculatePoints(player)}}</label>
        </li>
    </ul>

    <button @click="railsRidden">NEXT</button>
</template>