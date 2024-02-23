import { CANCEL_ORDER, MOVE_TO_NEXT_STAGE, PLACE_ORDER } from "../action/type";

const initialState = {
  orders: [],
  maxOrders: 10,
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLACE_ORDER:
      if (state.orders.length >= state.maxOrders) {
        alert("Not taking any order for now");
        return state;
      }
      return {
        ...state,
        orders: [...state.orders, { ...action.payload, stage: "Order Placed" }],
      };
    case MOVE_TO_NEXT_STAGE:
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload
            ? {
                ...order,
                stage: getNextStage(order.stage),
                startTime: new Date(),
              }
            : order
        ),
      };
    case CANCEL_ORDER:
      return {
        ...state,
        orders: state.orders.filter((order) => order.id !== action.payload),
      };
    default:
      return state;
  }
};

const getNextStage = (currentStage) => {
  switch (currentStage) {
    case "Order Placed":
      return "Order in Making";
    case "Order in Making":
      return "Order Ready";
    case "Order Ready":
      return "Order Picked";
    default:
      return currentStage;
  }
};

export default ordersReducer;
