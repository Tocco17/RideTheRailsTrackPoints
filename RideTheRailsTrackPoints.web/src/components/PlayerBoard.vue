<!-- It shows the playerboard -->
<script>
import Color from "./Color.vue";
export default {
    name: "playerboard",
    props: {
        color: {
            required: true
        },
        playerboard: {
            required: true,
        },
    },
    data() {
    },
    methods: {
    },
    computed: {
        /*
        All styles variable
        */
        colorVariable() {
            return {
                "--color": this.color.hex
            };
        }
    },
    components: { Color }
}
</script>
    
<template>
    <div class="playerboard" :style="colorVariable">
        <ul>
            <li v-for="track in playerboard.tracks">
                <label>{{track.shared}}</label>
                <Color :color="track.locomotive.color" :check="true"></Color>
                <ul>
                    <li v-for="space in track.spaces">
                        <Color :color="track.locomotive.color" :check="space.check" :radius="'10px'"></Color>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>
    
<style>
.playerboard {
    border-color: var(--color);
    display: flex;
    flex-direction: column;
    justify-content: start;
}
</style>