import React from "react"

const Pizza = (props) => {
  const {pizzas,editPizza}=props
  return(
    <tr>
      <td>{pizzas.topping}</td>
      <td>{pizzas.size}</td>
      <td>{pizzas.vegetarian? "Totally!":"EEW! No!"}</td>
      <td><button type="button" className="btn btn-primary" onClick={()=>{editPizza(pizzas)}}>Edit Pizza</button></td>
    </tr>
  )
}

export default Pizza
