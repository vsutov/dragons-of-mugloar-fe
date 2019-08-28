<template>
  <div id="shop-container">
    <h2 class="text text--center">Shop</h2>
    <div class="shop">
      <div
        v-for="(v, k) in shop"
        :key="k"
        class="shop--Item"
        :disabled="balance < v.cost"
        :class="{'shop--Item--disabled' : balance < v.cost}"
        @click="attemptPurchase(v.id)"
      >
        <div class="shop--Item-inner">
          <h5>{{v.name}}</h5>
          <p>Cost: {{v.cost}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "shop",
  props: {
    shop: {
      type: Array,
      required: true
    },
    balance: {
      type: Number
    }
  },
  methods: {
    attemptPurchase(itemId) {
      this.$store.dispatch("purchaseItem", itemId);
    }
  }
};
</script>