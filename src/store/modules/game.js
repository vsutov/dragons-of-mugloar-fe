import { RepositoryFactory } from '@/repositories/RepositoryFactory'

const state = {
  game: null,
  over: false
}

const mutations = {
  GAME_SET(state, game) {
    state.game = game
    state.over = false
  },
  STATS_UPDATE(state, stats) {
    Object.assign(state.game, stats)
  },
  GAME_OVER(state) {
    state.game = null
    state.over = true
  }
}
const actions = {
  initGame: async ({ commit, dispatch }) => {
    try {
      const response = await RepositoryFactory.get('game').startGame()
      if (response.status === 200 && response.data) {
        commit('GAME_SET', response.data)
        dispatch('fetchTasks')
        dispatch('fetchShop')
      } else {
        throw 'API call unsuccessful.'
      }
    } catch (error) {
      dispatch('messageHandler', { msg: error, success: false })
    }
  }
}
const getters = {
  game: state => {
    return state.game
  },
  balance: state => {
    if (state.game) return state.game.gold
    return 0
  },
  over: state => {
    return state.over
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
