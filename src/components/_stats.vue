<template>
  <div class="stats">
    <div
      class="stats--Item"
      :class="`stats--Item-${k}`"
      v-for="(v, k) in stats"
      :key="k"
    >{{k}}: {{v}}</div>
  </div>
</template>

<script>
export default {
  name: 'stats',
  props: {
    stats: {
      type: Object,
      required: true
    }
  }
}
</script>