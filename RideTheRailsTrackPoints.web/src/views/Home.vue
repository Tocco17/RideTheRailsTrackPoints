<script>
import { defineComponent } from "vue";
import NumberOfPlayers from "../components/NumberOfPlayers.vue";
import { shuffle } from "../utils/Randomize";
import TurnOrder from "../components/TurnOrder.vue";

export default defineComponent({
  data() {
    return {
      gamePhase: 0,
      players: []
    };
  },
  components: { NumberOfPlayers, TurnOrder },
  setup() { },
  methods: {
    initGame(selectedPlayers) {
      this.players = selectedPlayers.map(p => {
        return {
          ...p,
          points: 0,
          turnOrder: undefined
        }
      })
      this.manageTurnOrder(true)
      console.table(this.players)
      this.gamePhase++
    },
    manageTurnOrder(isRandom) {
      if (isRandom) shuffle(this.players)
      else this.players.sort((p1, p2) => p1.points > p2.points ? 1 : -1)

      this.players.forEach((p, index) => p.turnOrder = index)
    }
  },
  computed: {
    isSelectPlayersPhase() {
      return this.gamePhase === 0
    },
    isInGame() {
      return this.gamePhase !== 0
    },
    isTakeASharePhase() {
      return this.gamePhase === 1
    },
    isBuildRailroadTrackPhase() {
      return this.gamePhase === 2
    },
    isRideTheRailsPhase() {
      return this.gamePhase === 3
    },

  },
});
</script>

<template>
  <div class="flex flex-row justify-start items-start">HOME</div>

  <div v-if="isSelectPlayersPhase">
    <NumberOfPlayers @init-game="initGame"></NumberOfPlayers>
  </div>
  <div v-else>
    <h2>Game</h2>

    <div>
      <TurnOrder :players="players"></TurnOrder>
    </div>
  </div>
</template>