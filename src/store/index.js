import Vue from 'vue'
import Vuex from 'vuex'

import game from './modules/game'
import utils from './modules/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    game,
    utils
  }
})
