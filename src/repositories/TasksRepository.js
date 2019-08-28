import Repository from './Repository'

export default {
  // Get all messages (tasks) from messageboard
  fetchTasks(gameId) {
    return Repository.get(`${gameId}/messages`)
  },
  // Try to solve one of the message
  solveTask(gameId, taskId) {
    return Repository.post(`${gameId}/solve/${taskId}`)
  }
}
