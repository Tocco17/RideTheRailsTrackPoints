<!-- It shows the turn order -->
<script>
import PlayerComponent from './PlayerComponent.vue';
import PlayerBoard from './PlayerBoard.vue';

export default {
    name: "turnOrder",
    props: {
        //Players in game
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
    components: { PlayerComponent, PlayerBoard }
}
</script>
    
<template>
    <h2>Turn order</h2>
    <ul>
        <li v-for="player in players" :key="index">
            <PlayerComponent :player="player" :editable="false"></PlayerComponent>
            <PlayerBoard v-if="player.check" :playerboard="player.playerboard" :color="player.color"></PlayerBoard>
        </li>
    </ul>
</template>