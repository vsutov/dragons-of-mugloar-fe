import GameRepository from './GameRepository'
import TasksRepository from './TasksRepository'
import ShopRepository from './ShopRepository'

// Separated repositories for each action type
const repositories = {
  game: GameRepository,
  tasks: TasksRepository,
  shop: ShopRepository
}

// Resolve correct repository
export const RepositoryFactory = {
  get: name => repositories[name]
}
