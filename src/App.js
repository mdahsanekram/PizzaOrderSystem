// App.js
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import ordersReducer from "../src/reducer/reducers";
import PizzaOrderDisplay from "./components/PizzaOrderDisplay";
import PizzaForm from "./components/PizzaForm";

const store = createStore(ordersReducer);

const App = () => {
  return (
    <Provider store={store}>
      <PizzaForm />
      <PizzaOrderDisplay />
    </Provider>
  );
};

export default App;
