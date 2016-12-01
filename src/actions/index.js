import pizzaModel from '../models/pizza'
import * as types from '../constants/ActionTypes'

export const getAllPizzas = () => dispatch => {
  pizzaModel.getAll().then(data => {
    dispatch({
      type: types.RECEIVE_PIZZAS,
      data: data
    })
  })
}

export const addToCart = item => (dispatch) => {
  dispatch({
    type: types.ADD_TO_CART,
    item: item
  })
}

export const removeFromCart = index => (dispatch) => {
  dispatch({
    type: types.REMOVE_FROM_CART,
    index: index
  })
}
