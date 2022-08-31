import {
  REQUEST_LOGIN,
  RECEIVE_LOGIN,
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
  REQUEST_PRODUCTS,
  RECEIVE_PRODUCTS,
} from './Actions'

//LOGIN
export const nullSession = {
  userDetails: {},
}

export const loginReducer = (state = nullSession, payload = {}) => {
  const { type, userDetails } = payload
  switch (type) {
    case REQUEST_LOGIN:
      return { ...state, loading: true }
    case RECEIVE_LOGIN:
      return { ...state, userDetails, loading: false }
    default:
      return state
  }
}

//CATEGORIES
const _nullData = {
  categories: [],
  loading: false,
}

export const categoriesReducer = (state = _nullData, payload = {}) => {
  const { type, categories } = payload
  switch (type) {
    case REQUEST_CATEGORIES:
      return { ...state, loading: true }
    case RECEIVE_CATEGORIES:
      return { ...state, categories, loading: false }
    default:
      return state
  }
}

//PORUCTS
const _nullProductsData = {
  products: [],
  loading: false,
}

export const productsReducer = (state = _nullProductsData, payload = {}) => {
  const { type, products } = payload
  switch (type) {
    case REQUEST_PRODUCTS:
      return { ...state, loading: true }
    case RECEIVE_PRODUCTS:
      return { ...state, products, loading: false }
    default:
      return state
  }
}
