<script>
import { Colors } from '../classes/Color';
import Player from './Player.vue';

export default {
    name: "numberOfPlayers",
    props: {},
    data() {
        let players = []
        for (let n = 0; n < 5; n++) {
            players.push({
                name: '',
                check: false,
                color: Colors.Player.getColor(n)
            })
        }
        return {
            players
        };
    },
    methods: {
        initGame() {
            if (this.isContinueDisabled) return

            const selectedPlayers = this.checkedPlayer
            this.$emit('initGame', selectedPlayers)
        }
    },
    computed: {
        checkedPlayer() {
            return this.players.filter(p => p.check)
        },
        isContinueDisabled() {
            const players = this.checkedPlayer

            console.log('iscontinuedisabled')
            console.table(players)
            console.log('length', players.length < 3)
            console.log('some', players.some(p => !p.name))
            /*
            It's disabled if number of players checked is less then 3 and if any of those doesn't have a name
            */
            return players.length < 3 || players.some(p => !p.name)
        }
    },
    components: { Player }
}
</script>

<template>
    <h2>Select the players</h2>
    <ul>
        <li v-for="player in players" :key="index">
            <Player :player="player" :editable="true"></Player>
        </li>
    </ul>
    <div>
        <button :disabled="isContinueDisabled" @click="initGame">Continue</button>
    </div>
</template>