import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

class App extends Component {
  constructor() {
    super()
    this.state = {
      pizzas: [],
      editPizza: {
      }
    }
  }

  handleChange = (event) => {
    if (event.target.name === 'vegetarian') {
      this.setState({
        editPizza: {
          ...this.state.editPizza,
          vegetarian: event.target.value === ''
        }
      })
    } else {
      this.setState({
        editPizza: {
          ...this.state.editPizza,
          [event.target.name]: event.target.value
          // using [] to specify exactly what variables we're trying to change for a key (after destructring)
          // dynamic key for dynamic value
          }
        })
      }
    }

  componentDidMount() {
    fetch('http://localhost:3000/pizzas')
      .then( resp => resp.json() )
      .then( pizzaArray => {
        this.setState({
          pizzas: pizzaArray
        })
      })
    }

    editPizza = (pizza) => {
          this.setState({
            editPizza: pizza
      })
    }

  saveEdit = () => {
    const reqObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.editPizza)
    }

  fetch(`http://localhost:3000/pizzas/${this.state.editPizza.id}`, reqObj)
    .then( resp => resp.json() )
    .then(updatedPizza => {
      const newPizzas = this.state.pizzas.map(pizza => {
        if (pizza.id === updatedPizza.id) {
          return updatedPizza
        } else {
          return pizza
        }
      })
      this.setState({
        pizzas: newPizzas
      })
    })
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm 
          editPizza={this.state.editPizza}
          handleChange={this.handleToppingChange}
          saveEdit={this.saveEdit}/>
        <PizzaList 
          pizzas={this.state.pizzas}
          editPizza={this.editPizza}/>
      </Fragment>
    );
  }
}

export default App;
