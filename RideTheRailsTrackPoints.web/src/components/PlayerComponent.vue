<script>
import Color from "./Color.vue";
export default {
    name: "playerComponent",
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
        return {}
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
    },
    components: { Color }
}
</script>

<template>
    <div class="player">
        <Color :color="player.color" :check="player.check" @color-clicked="colorClicked"></Color>
        <div v-if="editable">
            <input v-show="player.check" type="text" v-model="player.name" placeholder="Insert a name" required />
        </div>
        <div v-else>
            <label>{{ player.name }} - {{ player.points }}</label>
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