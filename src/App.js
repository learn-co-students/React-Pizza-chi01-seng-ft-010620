import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  constructor(){
    super()
    this.state = {
      pizzas: [],
      editPizza: {}
    }
  }
  handleChange = (event) => {
    if (event.target.name === "vegetarian"){
      this.setState({
        editPizza: {...this.state.editPizza,
          [event.target.name]: event.target.value === "Vegetarian" 
        }
      })
      console.log(this.state.editPizza)
    } else {
      this.setState({
        editPizza: {...this.state.editPizza,
          [event.target.name]: event.target.value
        }
      })
    }
  }

  saveEdit = () => {
    const reqObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.editPizza)
    }
    fetch(`http://localhost:3000/pizzas/${this.state.editPizza.id}`, reqObj)
    .then(resp => resp.json())
    .then(updatedPizza => {
      const newPizzas = this.state.pizzas.map(pizza => {
        if (pizza.id == updatedPizza.id){
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

  componentDidMount(){
    fetch('http://localhost:3000/pizzas')
    .then(resp => resp.json())
    .then(pizzaArr => {
      this.setState({
        pizzas: pizzaArr
      })
    })
  }
  editPizza = (pizza) => {
    this.setState({
      editPizza: pizza
    })
  }
  render() {
    return (
      <Fragment>
        <Header/>
       <PizzaForm pizza={this.state.editPizza} handleChange={this.handleChange} saveEdit={this.saveEdit}/>
        <PizzaList pizzas={this.state.pizzas} editPizza={this.editPizza} />
      </Fragment>
    );
  }
}

export default App;
