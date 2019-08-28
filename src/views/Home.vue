<template>
  <div id="game-wrapper">
    <div class="game--New" v-if="!game">
      <img src="../assets/logo.png" alt="game-logo" />
      <button class="button" @click="startGame">Start game</button>
    </div>
    <div class="game" v-else>
      <header />
    </div>
  </div>
</template>
<script>
//vuex
import { mapGetters } from 'vuex'
export default {
  name: 'game',
  computed: {
    ...mapGetters(['game', 'ads', 'shop'])
  },
  methods: {
    startGame() {
      this.$store.dispatch('initGame')
    }
  }
}
</script>