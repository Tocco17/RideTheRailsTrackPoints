<!-- Permits to select available goal in the Build Railroad Track phase -->
<script>
import PlayerComponent from './PlayerComponent.vue';
import Color from './Color.vue';
import { Colors } from '../../classes/Color';

export default {
    name: "transcontinentalComponent",
    props: {
        player: {
            required: true
        },
        transcontinental: {
            required: true
        },
    },
    data() {
        return {}
    },
    methods: {
        full() {
            this.transcontinental.toggleFull(this.player)
        },
        normal() {
            this.transcontinental.toggleNormal(this.player)
        }
    },
    computed: {
        goalColor() {
            return Colors.Locomotive.black
        }
    },
    components: { PlayerComponent, Color }
}
</script>
                        
<template>
    <div v-if="transcontinental.available" @click="cityClicked">
        <label>TRANCONTINENTAL</label>

        <div @click="full">
            <Color :color="goalColor" :radius="'20px'" :check="transcontinental.check"></Color>
            <label>Full transcontinental</label>
        </div>

        <div @click="normal">
            <Color :color="goalColor" :radius="'20px'" :check="transcontinental.check"></Color>
            <label>Normal transcontinental</label>
        </div>
    </div>
</template>