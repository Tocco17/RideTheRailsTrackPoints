<script>
import Player from './Player.vue';
import Color from './Color.vue';
import { Colors } from '../classes/Color';

export default {
    name: "takeAShare",
    props: {
        round: {
            required: true
        },
        player: {
            required: true
        }
    },
    data() {
    },
    methods: {
        tookAShare(color) {
            // let track = this.getTrack(color.name)
            // track.shared++
            this.player.playerboard.takeAShare(color.name)
        },
        getTrack(name) {
            // return this.player.playerboard.tracks.find(t => t.locomotive.name === name)
            return this.player.playerboard.getTrack(name)
        }
    },
    computed: {
        availableRailroad() {
            return this.roundColors.filter(c => {
                const track = this.getTrack(c.name)
                return track.shared < track.maxSharedElements
            })
        },
        roundColors() {
            let colors = [
                Colors.Locomotive.red,
                Colors.Locomotive.blue
            ]

            if (this.round >= 2) colors.push(Colors.Locomotive.orange)
            if (this.round >= 3) colors.push(Colors.Locomotive.yellow)
            if (this.round >= 4) colors.push(Colors.Locomotive.purple)
            if (this.round >= 5) colors.push(Colors.Locomotive.black)

            return colors
        }
    },
    components: { Player, Color }
}
</script>
        
<template>
    <ul>
        <li v-for="railroad in availableRailroad">
            <Color :color="railroad" :check="true" @click="tookAShare(railroad)"></Color>
        </li>
    </ul>
</template>