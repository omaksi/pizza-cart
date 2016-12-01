import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../actions'
import { bindActionCreators } from 'redux'


class CartContainer extends Component {

  removeFromCart = (index) => {
    const { actions } = this.props;
    actions.removeFromCart(index);
  }


  countTotal() {
    const { cart } = this.props;
    let total = 0;
    cart.items.forEach((item, index) => {
      total += item.price
    });
    return total.toFixed(2);
  }


  render (){
    const { cart } = this.props;
    console.log('render cart', cart)
    return (
      <main>
        <section>
          Cart:
            {cart.items.map((item, index) =>
              <div key={`${index}`}>
                {`${item.name}`}
                <button
                  onClick={(index) => this.removeFromCart(index)}>
                  Remove from Cart
                </button>
              </div>
            )}
        </section>

        <section>
          Total:
          ${this.countTotal()}
        </section>

        <section>
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
)(CartContainer)
