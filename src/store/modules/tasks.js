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
          // if base64
          if (e.encrypted === 1) {
            e.adId = atob(e.adId)
            e.message = atob(e.message)
            e.probability = atob(e.probability)
            //if caesar shift ROT13
          } else if (e.encrypted === 2) {
            e.adid = caesarShift(e.adId)
            e.message = caesarShift(e.message)
            e.probability = caesarShift(e.probability)
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
      if (response.status === 200) {
        const data = response.data
        const stats = (({ success, message, ...stats }) => ({ ...stats }))(data)
        dispatch('fetchTasks')
        dispatch('messageHandler', { msg: data.message, success: data.success })
        if (stats.lives > 0) {
          commit('STATS_UPDATE', stats)
        } else {
          commit('GAME_OVER')
        }
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

function caesarShift(str) {
  let output = ''

  for (let i = 0; i < str.length; i++) {
    let c = str[i]

    if (c.match(/[a-z]/i)) {
      let code = str.charCodeAt(i)
      if (code >= 65 && code <= 90)
        c = String.fromCharCode(((code - 65 + 13) % 26) + 65)
      else if (code >= 97 && code <= 122)
        c = String.fromCharCode(((code - 97 + 13) % 26) + 97)
    }
    output += c
  }
  return output
}
