import axios from "axios"

var instance

instance = axios.create({
    baseURL: `http://${process.env.REACT_APP_SERVER_HOST}`,
  })

export { instance as default }
