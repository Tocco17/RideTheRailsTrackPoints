<script>
import { defineComponent } from "vue";
import NumberOfPlayers from "../components/NumberOfPlayers.vue";
import { shuffle } from "../utils/Randomize";
import TurnOrder from "../components/TurnOrder.vue";
import { Player } from "../classes/Player";
import TakeAShare from "../components/TakeAShare.vue";
import BuildRailroadTrack from "../components/BuildRailroadTrack.vue";
import RideTheRails from "../components/RideTheRails.vue";
import { Game } from "../classes/Game";

export default defineComponent({
  data() {
    return {
      game: undefined,  //The game, it's valorized only when a new game is created
      setted: false //TODO - To delete
    };
  },
  components: { NumberOfPlayers, TurnOrder, TakeAShare, BuildRailroadTrack, RideTheRails },
  setup() {
  },
  methods: {
    /*
    TODO - To delete
    It simulates a game
    */
    createGame() {
      const playersAux = [
        new Player('Fede', 'green'),
        new Player('Leo', 'red'),
        new Player('Bea', 'white'),
      ]
      this.initGame(playersAux)
    },
    /*
    Set the basis of a game
    */
    initGame(selectedPlayers) {
      this.game = new Game(selectedPlayers) //Game initialized
      this.game.newGame() //New game

      console.log('---------------------')
      console.log('Initialize the game')
      console.table(this.game.chicago)
      console.log('---------------------')
    },
    /*
    Next player in the turn
    */
    next() {
      this.game.nextTurn()
    },
    /*
    After a share is taken
    */
    shareTaken() {
      console.log('---------------------')
      console.log('share taken')
      console.table(this.playerInTurn)
      console.log('---------------------')
      this.next()
    },
    railroadBuiltHome() {
      console.log('---------------------')
      console.log('railroad built')
      console.table(this.playerInTurn)
      console.log('---------------------')
      this.next()
    }
  },
  computed: {
    setUpGame() { //TODO - To delete
      // return

      if (this.setted) return

      this.createGame()

      this.setted = true
      return this.game.phase
    },
    isSelectPlayersPhase() {
      return !this.game || this.game.phase === 0
    },
    isInGame() {
      return this.game.phase !== 0
    },
    isTakeASharePhase() {
      return this.game.phase === 1
    },
    isBuildRailroadTrackPhase() {
      return this.game.phase === 2
    },
    isRideTheRailsPhase() {
      return this.game.phase === 3
    },
    playerInTurn() {
      return this.game.getPlayerInTurn()
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
      <TurnOrder :players="game.players"></TurnOrder>
    </div>

    <div v-if="isTakeASharePhase">
      <TakeAShare :round="game.round" :player="playerInTurn" @share-taken="shareTaken"></TakeAShare>
    </div>

    <div v-if="isBuildRailroadTrackPhase">
      <BuildRailroadTrack :player="playerInTurn" :five-dollars-cities="game.fiveDollarsCities" :chicago="game.chicago"
        :transcontinental="game.transcontinental" @railroad-built="railroadBuiltHome"></BuildRailroadTrack>
    </div>

    <div v-if="isRideTheRailsPhase">
      <RideTheRails :player="playerInTurn"></RideTheRails>
    </div>
  </div>
</template>