<!-- Select players in the game -->
<script>
import { Colors } from '../classes/Color';
import { Player } from '../classes/Player';
import PlayerComponent from './PlayerComponent.vue';

export default {
    name: "numberOfPlayers",
    props: {},
    data() {
        let players = []
        for (let n = 0; n < 5; n++) {
            players.push(new Player('', Colors.Player.getColor(n), false))
        }

        return {
            players
        };
    },
    methods: {
        /*
        Permits to initialize the game
        */
        initGame() {
            //Checks if the initialization is valid
            if (this.isContinueDisabled) return

            //Get all selected players
            const selectedPlayers = this.checkedPlayer
            this.$emit('initGame', selectedPlayers)
        }
    },
    computed: {
        /*
        Get all selected players
        */
        checkedPlayer() {
            return this.players.filter(p => p.check)
        },
        /*
        Checks if all fields are valid
        */
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
    components: { PlayerComponent }
}
</script>

<template>
    <h2>Select the players</h2>
    <ul>
        <li v-for="player in players" :key="index">
            <PlayerComponent :player="player" :editable="true"></PlayerComponent>
        </li>
    </ul>

    <div>
        <button :disabled="isContinueDisabled" @click="initGame">Continue</button>
    </div>
</template>