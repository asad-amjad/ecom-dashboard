const axios = require('axios')

const withOutToken = {
  'Content-Type': 'application/json',
}

const helpers = {
  axiosPostCall: async (url, data) => {
    let res = await axios.post(process.env.REACT_APP_API_URL + url, data, {
      headers:
        url == '/user/login' || url == '/user/register'
          ? { ...withOutToken }
          : {
              'Content-Type': 'application/json',
              authorization: `bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
            },
    })

    let response = await res.data
    return response
  },

  axiosPutCall: async (url, data) => {
    let res = await axios.put(process.env.REACT_APP_API_URL + url, data, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
      },
    })

    let response = await res.data
    return response
  },

  axiosGetCall: async (url, data) => {
    let res = await axios.get(process.env.REACT_APP_API_URL + url, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
      },
    })

    let response = await res.data
    return response
  },

  axiosDeleteCall: async (url) => {
    let res = await axios.delete(process.env.REACT_APP_API_URL + url, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
      },
    })

    let response = await res.data
    return response
  },
}
export default helpers
