<script>
import Player from './Player.vue';

export default {
    name: "numberOfPlayers",
    props: {},
    data() {
        return {
            number: 1,
        };
    },
    methods: {},
    computed: {},
    components: { Player }
}
</script>

<template>
    <ul>
        <li v-for="index in number" :key="index">
            <Player></Player>
        </li>
    </ul>

</template>