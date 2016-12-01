import {
  RECEIVE_PIZZAS,
} from '../constants/ActionTypes'

const initialState = []

const pizzas = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_PIZZAS:
      return action.data;
    default:
      return state
  }
}

export default pizzas
