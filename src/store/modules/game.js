import { RepositoryFactory } from '@/repositories/RepositoryFactory'

const state = {
  game: null
}

const mutations = {
  GAME_SET(state, game) {
    state.game = game
  }
}
const actions = {
  initGame: async ({ commit, dispatch }) => {
    try {
      const response = await RepositoryFactory.get('game').startGame()
      if (response.status === 200 && response.data) {
        commit('GAME_SET', response.data)
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
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
