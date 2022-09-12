<script>
import { defineComponent } from "vue";
import NumberOfPlayers from "../components/NumberOfPlayers.vue";
import { shuffle } from "../utils/Randomize";
import TurnOrder from "../components/TurnOrder.vue";
import { Player } from "../classes/Player";
import { Colors } from "../classes/Color";
import TakeAShare from "../components/TakeAShare.vue";
import BuildRailroadTrack from "../components/BuildRailroadTrack.vue";
import RideTheRails from "../components/RideTheRails.vue";
import { PlayerBoard } from "../classes/PlayerBoard";

export default defineComponent({
  data() {
    return {
      gamePhase: 0,
      round: 0,
      players: [],
      playerTurn: -1,
      setted: false
    };
  },
  components: { NumberOfPlayers, TurnOrder, TakeAShare, BuildRailroadTrack, RideTheRails },
  setup() {
  },
  methods: {
    initGame(selectedPlayers) {
      this.players = selectedPlayers.map(p => {
        return {
          ...p,
          points: 0,
          turnOrder: undefined,
          playerboard: new PlayerBoard()
        }
      })
      this.manageTurnOrder(true)
      console.log('---------------------')
      console.log('Initialize the game')
      console.table(this.players)
      console.log('---------------------')
      this.gamePhase++
      this.round++
      this.playerTurn++
      this.playerInTurn.check = true
    },
    manageTurnOrder(isRandom) {
      if (isRandom) shuffle(this.players)
      else this.players.sort((p1, p2) => p1.points > p2.points ? 1 : -1)

      this.players.forEach((p, index) => p.turnOrder = index)
    },
    createGame() {  //TODO - To delete
      const playersAux = [
        new Player('Fede', 'green'),
        new Player('Leo', 'red'),
        new Player('Bea', 'white'),
      ]
      this.initGame(playersAux)
    },
    nextPlayer() {
      this.playerInTurn.check = false
      if (this.playerTurn === this.players.length - 1) this.playerTurn = 0
      else this.playerTurn++
      this.playerInTurn.check = true

      return this.playerTurn !== 0
    },
    shareTaken() {
      if (this.nextPlayer()) return

      this.gamePhase++
    }
  },
  computed: {
    setUpGame() {
      if (this.setted) return

      this.createGame()

      this.setted = true
      return this.gamePhase
    },
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
    playerInTurn() {
      return this.players[this.playerTurn]
    },


  },
});

</script>

<template>
  <div class="flex flex-row justify-start items-start">HOME</div>

  <div>Phase {{ setUpGame }}</div>

  <div v-if="isSelectPlayersPhase">
    <NumberOfPlayers @init-game="initGame"></NumberOfPlayers>
  </div>

  <div v-else>
    <h2>Game</h2>

    <div>
      <TurnOrder :players="players"></TurnOrder>
    </div>

    <div v-if="isTakeASharePhase">
      <TakeAShare :round="round" :player="playerInTurn" @share-taken="shareTaken"></TakeAShare>
    </div>

    <div v-if="isBuildRailroadTrackPhase">
      <BuildRailroadTrack :player="playerInTurn"></BuildRailroadTrack>
    </div>

    <div v-if="isRideTheRailsPhase">
      <RideTheRails :player="playerInTurn"></RideTheRails>
    </div>
  </div>
</template>