const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;

/*
  Model responsible for querying and mutate pizzaz
*/
class PizzaModel {

  constructor() {
    const client = new Lokka({
      transport: new Transport('https://core-graphql.dev.waldo.photos/pizza')
    });

    // Get the initial data from the transport (it's a promise)
    this.dataPromise = client
      // invoke the GraphQL query to get all the items
      .query(`
        {
          pizzaSizes {
            name
            maxToppings
            basePrice
            toppings {
              topping {
                name
                price
              }
              defaultSelected
            }
          }
        }
      `)
      .then(res => res.pizzaSizes);
  }

  getAll() {
    // get all the items but we clone the content inside the promise
    return this.dataPromise
      .then(items => items.concat([]));
  }
}

export default new PizzaModel()
