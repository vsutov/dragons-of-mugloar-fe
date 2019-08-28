<template>
  <div id="tasks-container">
    <h2 class="text text--center">Tasks</h2>
    <div class="tasks">
      <div
        v-for="(v, k) in tasks"
        :key="k"
        class="tasks--Item"
        @click="attempt(v.adId)"
        :class="probabilityClass(v.probability)"
      >
        <div class="tasks--Item-inner">
          <h5>{{v.message}}</h5>
          <p>Reward: {{v.reward}}</p>
          <p>Expires in: {{v.expiresIn}} steps</p>
          <p>Probability: {{ v.probability }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tasks",
  props: {
    tasks: {
      type: Array,
      required: true
    }
  },
  methods: {
    attempt(adId) {
      this.$store.dispatch("solveTask", adId);
    },
    probabilityClass(prob) {
      switch (prob) {
        case "Piece of cake":
        case "Walk in the park":
        case "Sure thing":
          return "tasks--Item--green";
        case "Hmmm....":
        case "Quite likely":
        case "Playing with fire":
          return "tasks--Item--yellow";
        case "Risky":
        case "Gamble":
        case "Suicide mission":
        case "Rather detrimental":
        case "Impossible":
          return "tasks--Item--red";
      }
    }
  }
};
</script>