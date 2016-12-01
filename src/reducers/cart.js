import {
  ADD_TO_CART,
  REMOVE_FROM_CART
} from '../constants/ActionTypes'

const initialState = {
  items: [],
}

const addToCart = (state, item) => {
  const newItems = state.items.slice(0)
  newItems.push(item)
  return { items: newItems }
}

const removeFromCart = (state, index) => {
  const newItems = state.items.slice(0)
  newItems.splice(index, 1)
  return { items: newItems }
}

const cart = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return addToCart(state, action.item);
    case REMOVE_FROM_CART:
      return removeFromCart(state, action.index);
    default:
      return state
  }
}

export default cart
