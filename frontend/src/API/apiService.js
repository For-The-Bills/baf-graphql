import axios from "axios"

var instance

instance = axios.create({
    baseURL: `http://${process.env.HOST_URL}`,
  })

export { instance as default }
