// PizzaForm.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { placeOrder } from "../action/Action";

const useForm = (initialState, validation) => {
  const dispatch = useDispatch();
  const [order, setOrder] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const incrementId = (id) => {
    const num = parseInt(id);
    return ("00" + (num + 1)).slice(-3);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validation(order);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      order.startTime = new Date();
      order.orderTime = new Date();
      await dispatch(placeOrder(order));
      setOrder({
        type: "",
        size: "",
        base: "",
        id: incrementId(order.id),
        startTime: 0,
        orderTime: 0,
      });
    }
  };
  return { order, errors, handleChange, handleSubmit };
};
const validForm = (order) => {
  let errors = {};
  if (!order.type.trim()) {
    errors.type = "Type is required";
  }
  if (!order.size.trim()) {
    errors.size = "Size is required";
  }
  if (!order.base.trim()) {
    errors.base = "Base is required";
  }

  return errors;
};

const PizzaForm = () => {
  const { order, errors, handleChange, handleSubmit } = useForm(
    {
      type: "",
      size: "",
      base: "",
      id: "001",
      startTime: 0,
      orderTime: 0,
    },
    validForm
  );

  return (
    <div className="containerFluid">
      <form
        onSubmit={handleSubmit}
        style={{
          border: "2px solid black",
          padding: "5px",
          margin: "5px",
        }}
      >
        <h1>Pizza Order System</h1>
        <div className="row">
          <div className="col-3">
            <label>
              Type:
              <select name="type" value={order.type} onChange={handleChange}>
                <option>Select...</option>
                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non-Veg</option>
              </select>
            </label>
            {errors.type && <p style={{ color: "red" }}>{errors.type}</p>}{" "}
          </div>
          <div className="col-3">
            <label>
              Size:
              <select name="size" value={order.size} onChange={handleChange}>
                <option>Select...</option>
                <option value="Large">Large</option>
                <option value="Medium">Medium</option>
                <option value="Small">Small</option>
              </select>
            </label>
            {errors.size && <p style={{ color: "red" }}>{errors.size}</p>}{" "}
          </div>
          <div className="col-3">
            <label>
              Base :
              <select name="base" value={order.base} onChange={handleChange}>
                <option>Select...</option>
                <option value="Thin">Thin</option>
                <option value="Thick">Thick</option>
              </select>
            </label>
            {errors.base && <p style={{ color: "red" }}>{errors.base}</p>}{" "}
          </div>
          <div className="col-3">
            <button type="submit">Place Order</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PizzaForm;
