import Repository from './Repository'

const resource = '/game'

export default {
  // Start a new game
  startGame() {
    return Repository.post(`${resource}/start`)
  },
  // Run an investigation about your reputation... Unused???
  investigate(gameId){
    return Repository.post(`${gameId}/investigate/reputation`)
  }
}
