import Vue from 'vue'
import Vuex from 'vuex'

//import vuex modules
import game from './modules/game'
import shop from './modules/shop'
import tasks from './modules/tasks'
import utils from './modules/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    game,
    utils,
    shop,
    tasks
  }
})
