<!-- Permits to select available goal in the Build Railroad Track phase -->
<script>
import PlayerComponent from './PlayerComponent.vue';
import Color from './Color.vue';
import { Colors } from '../classes/Color';
import FiveDollarsCitiesComponent from './FiveDollarsCitiesComponent.vue';
import ChicagoComponent from './ChicagoComponent.vue';
import TranscontinentalComponent from './TranscontinentalComponent.vue';
import { Player } from '../classes/Player';

export default {
    name: "buildRailRoadTrack",
    props: {
        player: {
            required: true
        },
        fiveDollarsCities: {
            required: true
        },
        chicago: {
            required: true
        },
        transcontinental: {
            required: true
        }
    },
    data() {
        return {
            debug: true
        }
    },
    methods: {
        next() {
            console.log('---------------------')
            console.log('Railroad built')

            this.fiveDollarsCities.forEach((c, i) => {
                console.log(`-> ${i} city`)
                console.log('--> before')
                console.table(c)

                if (c.check) c.available = false

                console.log('--> after')
                console.table(c)
            })

            this.chicago.check = false
            this.chicago.available = this.chicago.achievedPlayer?.length === 6

            this.transcontinental.available = !this.transcontinental.achievedPlayer

            console.log('five dollar city')
            console.table(this.fiveDollarsCities)
            console.log('chicago')
            console.table(this.chicago)
            console.log('transcontinental')
            console.table(this.transcontinental)
            console.log('---------------------')

            this.$emit('railroadBuilt')
        }
    },
    computed: {
        fiveTaken() {
            return this.fiveDollarsCities.filter(c => !c.available)
        }
    },
    components: { PlayerComponent, Color, FiveDollarsCitiesComponent, ChicagoComponent, TranscontinentalComponent }
}
</script>
            
<template>
    <FiveDollarsCitiesComponent :five-dollars-cities="fiveDollarsCities" :player="player"></FiveDollarsCitiesComponent>

    <ChicagoComponent :chicago="chicago" :player="player"></ChicagoComponent>

    <TranscontinentalComponent :transcontinental="transcontinental" :player="player"></TranscontinentalComponent>

    <button @click="next">NEXT</button>

    <div v-if="debug">
        <h3>TOOK</h3>

        <div>
            <label>FIVE DOLLARS CITIES</label>
            <ul>
                <li v-for="city in fiveTaken">
                    {{city.name}} - {{city.achievedPlayer.name}}
                </li>
            </ul>
        </div>

        <div>
            <label>CHICAGO</label>
            <ul>
                <li v-if="chicago.achievedPlayer" v-for="player in chicago.achievedPlayer">{{player.name}}</li>
            </ul>
        </div>

        <div>
            <label>TRANSCONTINENTAL</label>
            <label>{{transcontinental.achievedPlayer?.name}}</label>
        </div>
    </div>
</template>