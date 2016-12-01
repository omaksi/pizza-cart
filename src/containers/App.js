import React from 'react'
import ProductsContainer from './ProductsContainer'
import CartContainer from './CartContainer'

const App = () => (
  <div>
    <h2>Waldo's Unlimited Toppings Pizza Cart</h2>
    <h4>Please pick a pizza before adding to cart!</h4>
    <hr/>
    <ProductsContainer />
    <hr/>
    {<CartContainer />}
  </div>
)

export default App
