import axios from 'axios'

const baseDomain = 'https://dragonsofmugloar.com'
const baseURL = `${baseDomain}/api/v2/`

// Creation of axios instance
export default axios.create({
  baseURL
})
