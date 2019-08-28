<template>
  <div id="game-wrapper">
    <div class="game--New" v-if="!game">
      <img src="../assets/logo.png" alt="game-logo" />
      <button class="button" @click="startGame">Start game</button>
    </div>
    <div class="game" v-else>
      <stats :stats="normalizeStats" />
      <tasks :tasks="tasks" />
    </div>
  </div>
</template>
<script>
import Stats from '@/components/_stats.vue'
import Tasks from '@/components/_tasks.vue'

//vuex
import { mapGetters } from 'vuex'

export default {
  name: 'game',
  components: {
    Stats,
    Tasks 
  },
  computed: {
    ...mapGetters(['game', 'tasks', 'shop']),
    normalizeStats() {
      const stats = (({ gameId, ...stats }) => ({ ...stats }))(this.game)
      return stats
    }
  },
  methods: {
    startGame() {
      this.$store.dispatch('initGame')
    }
  }
}
</script>