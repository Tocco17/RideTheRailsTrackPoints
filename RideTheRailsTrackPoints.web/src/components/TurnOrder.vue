<script>
import Player from './Player.vue';
import PlayerBoard from './PlayerBoard.vue';

export default {
    name: "turnOrder",
    props: {
        players: {
            required: true
        }
    },
    data() {
    },
    methods: {
    },
    computed: {
    },
    components: { Player, PlayerBoard }
}
</script>
    
<template>
    <h2>Turn order</h2>
    <ul>
        <li v-for="player in players" :key="index">
            <Player :player="player" :editable="false"></Player>
            <PlayerBoard v-if="player.check" :playerboard="player.playerboard" :color="player.color"></PlayerBoard>
        </li>
    </ul>
</template>