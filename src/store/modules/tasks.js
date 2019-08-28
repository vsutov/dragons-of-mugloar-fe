import { RepositoryFactory } from '@/repositories/RepositoryFactory'


const state = {
  tasks: []
}

const mutations = {
  TASKS_SET(state, tasks) {
    state.tasks = tasks
  }
}
const actions = {
  fetchTasks: async ({ getters, commit, dispatch }) => {
    try {
      const game = getters.game
      const response = await RepositoryFactory.get('tasks').fetchTasks(
        game.gameId
      )
      if (response.status === 200 && response.data) {
        const data = response.data
        data.forEach(e => {
          if(e.encrypted === 1){
            console.log('base64')
            e.message = atob(e.message)
            e.probability = atob(e.probability)
          }
        })
        commit('TASKS_SET', response.data)
      } else {
        throw 'API call unsuccessful.'
      }
    } catch (error) {
      dispatch('messageHandler', { msg: error, success: false })
    }
  },
  solveTask: async ({ getters, commit, dispatch }, taskId) => {
    try {
      const game = getters.game
      const response = await RepositoryFactory.get('tasks').solveTask(
        game.gameId,
        taskId
      )
      if (response.status === 200 && response.data) {
        const data = response.data
        const stats = (({ success, message, ...stats }) => ({ ...stats }))(data)
        dispatch('fetchTasks')
        dispatch('messageHandler', { msg: data.message, success: data.success })
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
  tasks: state => {
    return state.tasks
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
