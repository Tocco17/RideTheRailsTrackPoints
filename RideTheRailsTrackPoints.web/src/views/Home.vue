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
      game: undefined, //The game, it's valorized only when a new game is created
    };
  },
  components: {
    NumberOfPlayers,
    TurnOrder,
    TakeAShare,
    BuildRailroadTrack,
    RideTheRails,
  },
  setup() {},
  methods: {
    /*
    Set the basis of a game
    */
    initGame(selectedPlayers) {
      this.game = new Game(selectedPlayers); //Game initialized
      this.game.newGame(); //New game
    },
    /*
    Next passage
    */
    next() {
      const gameKey = `game-${this.game.round}-${this.game.phase}-${this.game.playerInTurn}`;
      localStorage.setItem(gameKey, JSON.stringify(this.game));
      this.game.nextTurn();
    },
    /*
    Restores passage before
    */
    before() {
      let inTurn = this.game.playerInTurn - 1;
      let phase = this.game.phase;
      let round = this.game.round;

      if (inTurn < 0) {
        inTurn = this.game.players.length - 1;
        phase--;

        if (phase == 0) {
          phase = 3;
          round--;
        }
      }

      const key = `game-${round}-${phase}-${inTurn}`;
      this.game = JSON.parse(localStorage.getItem(key));
    },
    /*
    After a share is taken
    */
    shareTaken() {
      this.next();
    },
    railroadBuilt() {
      this.next();
    },
    railsRidden() {
      this.next();
    },
  },
  computed: {
    isSelectPlayersPhase() {
      return !this.game || this.game.phase === 0;
    },
    isInGame() {
      return this.game.phase !== 0;
    },
    isTakeASharePhase() {
      return this.game.phase === 1;
    },
    isBuildRailroadTrackPhase() {
      return this.game.phase === 2;
    },
    isRideTheRailsPhase() {
      return this.game.phase === 3;
    },
    playerInTurn() {
      return this.game.getPlayerInTurn();
    },
  },
});
</script>

<template>
  <div class="flex flex-row justify-start items-start">HOME</div>

  <div>Phase</div>

  <div v-if="isSelectPlayersPhase">
    <NumberOfPlayers @init-game="initGame"></NumberOfPlayers>
  </div>

  <div v-else>
    <h2>Game</h2>

    <div>
      <TurnOrder :players="game.players"></TurnOrder>
    </div>

    <div v-if="isTakeASharePhase">
      <TakeAShare
        :round="game.round"
        :player="playerInTurn"
        @share-taken="shareTaken"
      ></TakeAShare>
    </div>

    <div v-if="isBuildRailroadTrackPhase">
      <BuildRailroadTrack
        :player="playerInTurn"
        :five-dollars-cities="game.fiveDollarsCities"
        :chicago="game.chicago"
        :transcontinental="game.transcontinental"
        @railroad-built="railroadBuilt"
      ></BuildRailroadTrack>
    </div>

    <div v-if="isRideTheRailsPhase">
      <RideTheRails
        :player-turn="game.playerTurn"
        :players="game.players"
        @rails-ridden="railsRidden"
      ></RideTheRails>
    </div>
  </div>
</template>