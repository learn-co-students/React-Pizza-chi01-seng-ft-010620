import React, { Component, Fragment } from 'react';
import Header from './components/Header';
import PizzaForm from './components/PizzaForm';
import PizzaList from './containers/PizzaList';
class App extends Component {
  state = {
    pizzas: [],
    pizzaToEdit: []
  };
  componentDidMount() {
    fetch(`http://localhost:3000/pizzas`)
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        this.setState({
          pizzas: data
        });
      });
  }
  editPizza = pizza => {
    console.log('pizza to edit', pizza);
    this.setState({
      pizzaToEdit: pizza
    });
  };
  handleChanges = event => {
    const change = event.target.value;
    console.log(change);
    if (event.target.name === 'vegetarian') {
      this.setState({
      pizzaToEdit: {
          ...this.state.pizzaToEdit,
          vegetarian: change === 'Vegetarian'
        }
      });
    } else {
    this.setState({
      pizzaToEdit:{
        ...this.state.pizzaToEdit,
        [event.target.name]: change
      }

    })}
  };
  submitEdits=(event)=>{
   
    const newPizza= this.state.pizzaToEdit
    console.log("hihihi", newPizza)
    const configObj ={
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newPizza)
    }
    fetch(`http://localhost:3000/pizzas/${newPizza.id}`, configObj)
    .then(resp=>resp.json())
    .then(data=>{
      const newPizzas = this.state.pizzas.map(pizza=>{
        if(pizza.id === data.id){
          return data 
        }else {
          return pizza
        }
      })
      this.setState({
        pizzas: newPizzas
      })
    })
  }
  render() {
    console.log(this.state.pizzaToEdit)
    return (
      <Fragment>
        <Header />
        <PizzaForm
          editPizza={this.state.pizzaToEdit}
          edits={this.handleChanges}
          submitEdit={this.submitEdits}
        />
        <PizzaList pizzas={this.state.pizzas} editPizza={this.editPizza}  />
      </Fragment>
    );
  }
}

export default App;
