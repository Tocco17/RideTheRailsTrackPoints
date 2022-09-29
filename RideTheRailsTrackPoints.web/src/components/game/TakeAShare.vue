<!-- It manages the Take A Share phase  -->
<script>
import Color from './Color.vue';
import { Colors } from '../../classes/Color';

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
        return {}
    },
    methods: {
        takeAShare(color) {
            this.player.takeAShare(color.name)
            this.$emit('shareTaken')
        },
        getTrack(name) {
            return this.player.playerboard.getTrack(name)
        }
    },
    computed: {
        availableRailroad() {
            return this.roundColors.filter(c => {
                const track = this.getTrack(c.name)
                return track.shared < track.maxElements
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
    components: { Color }
}
</script>
        
<template>
    <ul>
        <li v-for="railroad in availableRailroad">
            <Color :color="railroad" :check="true" @click="takeAShare(railroad)"></Color>
        </li>
    </ul>
</template>