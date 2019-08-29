const state = {
  messages: []
}

const mutations = {
  ADD_MSG(state, message) {
    state.messages.push(message)
  },
  REMOVE_MSG(state) {
    state.messages.shift()
  }
}

const actions = {
  messageHandler: async ({ commit }, messageObj) => {
    // Push a message to array, remove it after 5 seconds
    commit('ADD_MSG', messageObj),
      setTimeout(() => {
        commit('REMOVE_MSG')
      }, 5000)
  }
}

const getters = {
  messages: state => {
    return state.messages
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
