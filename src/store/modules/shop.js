import { RepositoryFactory } from '@/repositories/RepositoryFactory'

const state = {
  shop: []
}

const mutations = {
  // Set shop items
  SHOP_SET(state, shop) {
    state.shop = shop
  }
}
const actions = {
  fetchShop: async ({ getters, commit, dispatch }) => {
    try {
      const game = getters.game
      const response = await RepositoryFactory.get('shop').fetchShop(
        game.gameId
      )
      if (response.status === 200 && response.data) {
        // Set shop items in case of success
        commit('SHOP_SET', response.data)
      } else {
        throw 'API call unsuccessful.'
      }
    } catch (error) {
      dispatch('messageHandler', { msg: error, success: false })
    }
  },
  purchaseItem: async ({ getters, commit, dispatch }, itemId) => {
    try {
      const game = getters.game
        const response = await RepositoryFactory.get('shop').buy(
        game.gameId,
        itemId
      )
      if (response.status === 200 && response.data) {
        const data = response.data
        // Remove unneeded key "shoppingSuccess" for stats
        const stats = (({ shoppingSuccess, ...stats }) => ({ ...stats }))(data)
        // Generate message
        const msg = data.shoppingSuccess ? 'Shopping succeeded!' : 'Shopping failed!'
        // Re-fetch tasks with updated "expires in", update stats
        dispatch('fetchTasks')
        dispatch('messageHandler', { msg: msg, success: data.shoppingSuccess })
        commit('STATS_UPDATE', stats)
      } else {
        throw 'API call unsuccessful.'
      }
    } catch (error) {
      dispatch('messageHandler', { msg: error, success: false })
    }
  }
}
const getters = {
  shop: state => {
    return state.shop
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
