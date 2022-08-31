import { combineReducers } from 'redux'

import { templateReducer } from '../../src/templateReducer'
import { loginReducer, categoriesReducer, productsReducer } from './Reducers'

export const rootReducer = combineReducers({
  loginReducer,
  templateReducer,
  categoriesReducer,
  productsReducer,
})
