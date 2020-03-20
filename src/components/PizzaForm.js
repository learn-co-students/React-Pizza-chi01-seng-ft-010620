import React from 'react';

const PizzaForm = props => {
  const { editPizza, edits ,submitEdit} = props;
  
  return (
    <div className="form-row">
      <div className="col-5">
        <input
          type="text"
          className="form-control"
          placeholder="Pizza Topping"
          onChange={edits}
          name="topping"
          value={editPizza.topping}
        />
      </div>
      <div className="col">
        <select
          onChange={edits}
          name="size"
          value={editPizza.size}
          className="form-control"
        >
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </div>
      <div className="col" >
        <div className="form-check">
          <input
           onChange={edits} 
           name="vegetarian"
            className="form-check-input"
            type="radio"
            value="Vegetarian"
            checked={editPizza.vegetarian}
          />
          <label className="form-check-label">Vegetarian</label>
        </div>
        <div className="form-check">
          <input
          onChange={edits}
          name="vegetarian"
            className="form-check-input"
            type="radio"
            value="Not Vegetarian"
            checked={editPizza.vegetarian}
          />
          <label className="form-check-label">Not Vegetarian</label>
        </div>
      </div>
      <div className="col">
        <button type="submit" className="btn btn-success" onClick={(event)=>{submitEdit(event)}}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default PizzaForm;
PizzaForm.defaultProps={
  editPizza:{
    topping: 'foo',
    size: 'small',
    vegetarian:true
  }
}
