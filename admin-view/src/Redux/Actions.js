import helpers from 'src/utils/Helpers'

//Constants
export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN'
export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS'
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS'

//Actions

//Login
export const requestLogin = () => ({ type: REQUEST_LOGIN })
export const receiveLogin = (userDetails) => ({
  type: RECEIVE_LOGIN,
  userDetails,
})

export const userLogin = (data, callBack) => (dispatch) => {
  dispatch(requestLogin())
  helpers.axiosPostCall(`/user/login`, data).then((response) => {
    if (response.accessToken) {
      localStorage.setItem('accessToken', JSON.stringify(response.accessToken))
      localStorage.setItem('userDetails', JSON.stringify(response.userDetails))
      dispatch(receiveLogin(response.userDetails))
      callBack(true)
    }
  })
}

//Categories
const requestCategories = () => ({ type: REQUEST_CATEGORIES })
const receiveCategories = (categories) => ({
  type: RECEIVE_CATEGORIES,
  categories,
})

export const fetchCategories = (data) => (dispatch) => {
  dispatch(requestCategories())
  helpers.axiosGetCall(`/category`).then((categories) => {
    dispatch(receiveCategories(categories))
  })
}

//Products
const requestProducts = () => ({ type: REQUEST_PRODUCTS })
const receiveProducts = (products) => ({
  type: RECEIVE_PRODUCTS,
  products,
})

export const fetchProducts = (data) => (dispatch) => {
  dispatch(requestProducts())
  helpers.axiosGetCall(`/product`).then((products) => {
    dispatch(receiveProducts(products))
  })
}
