import Repository from './Repository'

const resource = '/shop'

export default {
  // Get the listing of items available in shop
  fetchShop(gameId) {
    return Repository.get(`${gameId}${resource}`)
  },
  // Purchase an item
  buy(gameId, itemId) {
    return Repository.post(`${gameId}${resource}/buy/${itemId}`)
  }
}
