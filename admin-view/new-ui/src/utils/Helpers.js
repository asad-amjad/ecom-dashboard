const axios = require('axios')

const helpers = {
  axiosPostCall: async (url, data) => {
    let res = await axios.post(process.env.REACT_APP_API_URL + url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    let response = await res.data
    return response
  },

  axiosGetCall: async (url, data) => {
    let res = await axios.get(process.env.REACT_APP_API_URL + url, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    let response = await res.data
    return response
  },
}
export default helpers
