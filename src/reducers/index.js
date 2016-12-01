import { combineReducers } from 'redux'
import cart from './cart'
import pizzas from './pizzas'

export default combineReducers({
  cart,
  pizzas
})
