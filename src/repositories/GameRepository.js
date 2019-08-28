import Repository from './Repository'

const resource = '/game'

export default {
  startGame() {
    return Repository.post(`${resource}/start`)
  }
}
