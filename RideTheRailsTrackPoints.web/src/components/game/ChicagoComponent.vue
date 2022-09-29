<!-- Permits to select available goal in the Build Railroad Track phase -->
<script>
import PlayerComponent from './PlayerComponent.vue';
import Color from './Color.vue';
import { Colors } from '../../classes/Color';

export default {
    name: "chicagoComponent",
    props: {
        player: {
            required: true
        },
        chicago: {
            required: true
        },
    },
    data() {
        return {}
    },
    methods: {
        cityClicked() {
            this.chicago.toggle(this.player)
        },
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
    <div @click="cityClicked">
        <Color :color="goalColor" :radius="'20px'" :check="chicago.check"></Color>
        <label>CHICAGO</label>
    </div>
</template>