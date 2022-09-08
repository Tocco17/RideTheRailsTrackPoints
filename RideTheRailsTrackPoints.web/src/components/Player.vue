<script>
import Color from "./Color.vue";
export default {
    name: "player",
    props: {
        editable: {
            type: Boolean,
            required: false,
            default: false,
        },
        player: {
            required: true,
            default: {
                name: "",
                colors: ""
            }
        },
        prova: {
            required: false,
            default: ''
        }
    },
    data() {
    },
    methods: {
        colorClicked() {
            this.player.check = !this.player.check
        },
        changeName(event) {
            console.log(event)
            debugger
            this.player.name = event.target.value
        }
    },
    computed: {
        colorVariable() {
            return {
                "--color": this.player.color.RGBA
            };
        }
    },
    components: { Color }
}
</script>

<template>
    <div class="player">
        <Color :color="player.color" :check="player.check" @color-clicked="colorClicked"></Color>
        <div v-show="player.check">
            <input v-if="editable" type="text" v-model="player.name" placeholder="Insert a name" required />
            <label v-else>{{ player.name }}</label>
        </div>
    </div>
</template>

<style>
.player {
    display: flex;
    flex-direction: row;
    justify-content: start;
}
</style>