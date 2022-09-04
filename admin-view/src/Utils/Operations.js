import helpers from './Helpers'

const fetchSubCategories = () => {
  return new Promise((resolve, reject) => {
    helpers
      .axiosGetCall(`/sub-category`, {})
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export { fetchSubCategories }
