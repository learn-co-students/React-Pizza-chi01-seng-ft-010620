import React from "react"

const PizzaForm = (props) => {
  const {topping, size, vegetarian} = props.pizza
  return(
      <div className="form-row">
        <div className="col-5">
            <input type="text" name="topping" onChange={props.handleChange} className="form-control" placeholder="Pizza Topping" value={
                topping
              }/>
        </div>
        <div className="col">
          <select value={size} onChange={props.handleChange} name="size" className="form-control">
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input className="form-check-input" onChange={props.handleChange} name="vegetarian" type="radio" value="Vegetarian" checked={vegetarian}/>
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" onChange={props.handleChange} type="radio" name="vegetarian" value="Not Vegetarian" checked={!vegetarian}/>
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" onClick={props.saveEdit} >Submit</button>
        </div>
      </div>

  )
}

PizzaForm.defaultProps = {
  pizza: {
    topping: '',
    size: '',
    vegatarian: true
  }
}

export default PizzaForm
