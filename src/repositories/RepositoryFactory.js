import GameRepository from './GameRepository'

const repositories = {
  game: GameRepository
}

export const RepositoryFactory = {
  get: name => repositories[name]
}
