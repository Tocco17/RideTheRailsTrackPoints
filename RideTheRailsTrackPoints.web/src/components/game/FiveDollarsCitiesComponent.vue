<!-- Permits to select available goal in the Build Railroad Track phase -->
<script>
import PlayerComponent from './PlayerComponent.vue';
import Color from './Color.vue';
import { Colors } from '../../classes/Color';

export default {
    name: "fiveDollarsCitiesComponent",
    props: {
        player: {
            required: true
        },
        fiveDollarsCities: {
            required: true
        },
    },
    data() {
        return {}
    },
    methods: {
        cityClicked(city) {
            city.toggle(this.player)
        },
        goalColor(city) {
            let color = Colors.Locomotive.black

            if (city.achievedPlayer) color = city.achievedPlayer.color

            return color
        }
    },
    computed: {
        availableCities() {
            return this.fiveDollarsCities.filter(c => c.available)
        }
    },
    components: { PlayerComponent, Color }
}
</script>
                
<template>
    <div>
        <label>FIVE DOLLARS CITIES</label>
        <ul>
            <li v-for="city in availableCities" @click="cityClicked(city)">
                <Color :color="goalColor(city)" :radius="'20px'" :check="city.check"></Color>
                {{city.name}}
            </li>
        </ul>
    </div>
</template>