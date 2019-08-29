<template>
  <div id="game-wrapper">
    <div class="game--New" v-if="!game">
      <img src="../assets/logo.png" alt="game-logo" />
      <h1 v-if="over">Game over!</h1>
      <button class="button" @click="startGame">{{over ? 'Start over' : 'New game'}}</button>
    </div>
    <div class="game" v-else>
      <stats :stats="normalizeStats" />
      <div class="text text--center" v-if="currMessage" :class="messageColor">{{ currMessage.msg }}</div>
      <div class="game--body">
        <tasks :tasks="tasks" />
        <shop :shop="shop" :balance="balance" />
      </div>
    </div>
  </div>
</template>
<script>
import Stats from "@/components/_stats.vue";
import Tasks from "@/components/_tasks.vue";
import Shop from "@/components/_shop.vue";

//vuex
import { mapGetters } from "vuex";

export default {
  name: "game",
  components: {
    Stats,
    Tasks,
    Shop
  },
  computed: {
    ...mapGetters(["game", "tasks", "shop", "balance", "messages", "over"]),
    normalizeStats() {
      const stats = (({ gameId, ...stats }) => ({ ...stats }))(this.game);
      return stats;
    },
    currMessage() {
      return this.messages.length > 0
        ? this.messages[this.messages.length - 1]
        : undefined;
    },
    messageColor() {
      if (this.currMessage) {
        if (this.currMessage.success) return "text--green";
        return "text--red";
      }
    }
  },
  methods: {
    startGame() {
      this.$store.dispatch("initGame");
    },
    refreshHandler() {}
  },
  created() {
    window.addEventListener("beforeunload", event => {
      event.returnValue = `Are you sure you want to leave?`;
    });
  }
};
</script>