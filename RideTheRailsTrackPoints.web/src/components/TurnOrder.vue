<script>
import { Colors } from '../classes/Color';
import Player from './Player.vue';

export default {
    name: "turnOrder",
    props: {
        players: {
            required: true
        }
    },
    data() {
    },
    methods: {
    },
    computed: {
    },
    components: { Player }
}
</script>
    
    <template>
    <h2>Turn order</h2>
    <ul>
        <li v-for="player in players" :key="index">
            <Player :player="player" :editable="false"></Player>
        </li>
    </ul>
</template>