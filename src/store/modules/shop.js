import { RepositoryFactory } from '@/repositories/RepositoryFactory'

const state = {
  shop: []
}

const mutations = {
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
        commit('SHOP_SET', response.data)
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
