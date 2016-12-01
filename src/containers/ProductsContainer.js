import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../actions'
import { bindActionCreators } from 'redux'

class ProductsContainer extends Component {

  componentDidMount(){
    console.log(this.props)
    const { actions } = this.props;
    actions.getAllPizzas();
  }

  state = {
    selectedPizzaIndex: 0,
    selectedToppings: [],
    total: 0
  }

  handlePizzaChange = (e) => {
    const { pizzas } = this.props;
    const selectedToppings = pizzas[e.target.value].toppings.map(topping => topping.defaultSelected);
    const total = this.countTotal(e.target.value, selectedToppings);
    this.setState({
      selectedPizzaIndex: e.target.value,
      selectedToppings: selectedToppings,
      total: total
    })
  }

  handleToppingsChange = (e, index) => {
    const { selectedPizzaIndex, selectedToppings } = this.state;
    const clone = selectedToppings.slice(0);
    clone[index] = !clone[index];
    const total = this.countTotal(selectedPizzaIndex, clone);
    this.setState({
      selectedToppings: clone,
      total: total
    })
  }

  countTotal(selectedPizzaIndex, selectedToppings) {
    const { pizzas } = this.props;
    let total = pizzas[selectedPizzaIndex].basePrice;
    pizzas[selectedPizzaIndex].toppings.forEach((topping, index) => {
      total += selectedToppings[index] ? topping.topping.price : 0
    });
    return total.toFixed(2);
  }

  addToCart = () => {
    const { actions, pizzas } = this.props;
    const { selectedPizzaIndex, selectedToppings, total } = this.state;
    actions.addToCart({
      name: `${pizzas[selectedPizzaIndex].name} with ${selectedToppings.filter(topping => topping).length} toppings - $${total}`,
      price: parseFloat(total)
    });
  }

  render (){
    const { pizzas } = this.props;
    const { selectedPizzaIndex, selectedToppings, total } = this.state;
    console.log('render', pizzas)
    return (
      <main>
        <section>
          Pizzas:
          <select onChange={this.handlePizzaChange}>
            {pizzas.map((pizza, index) =>
              <option
                key={`pizza${index}`}
                value={index}>
                {`${pizza.name} - $${pizza.basePrice} Max Toppings:${pizza.maxToppings}` }
              </option>
            )}
          </select>
        </section>

        <section>
          Toppings
            {selectedToppings.map((topping, index) =>
              <div key={`topping${index}`}>
                <input checked={topping} type="checkbox"
                  onChange={(e) => {this.handleToppingsChange(e, index)}}
                />
              {`${pizzas[selectedPizzaIndex].toppings[index].topping.name} - $${pizzas[selectedPizzaIndex].toppings[index].topping.price}`}
              </div>
            )}
        </section>

        <section>
          Pizza cost:
          ${total}
        </section>

        <section>
          <button
            onClick={this.addToCart}>
            Add to Cart
          </button>
        </section>
      </main>
    )
  }
}

const mapStateToProps = state => ({
  pizzas: state.pizzas,
  cart: state.cart
})

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsContainer)
