import { CANCEL_ORDER, MOVE_TO_NEXT_STAGE, PLACE_ORDER } from "./type";

export const placeOrder = (order) => ({
  type: PLACE_ORDER,
  payload: order,
});

export const moveToNextStage = (orderId) => ({
  type: MOVE_TO_NEXT_STAGE,
  payload: orderId,
});

export const cancelOrder = (orderId) => ({
  type: CANCEL_ORDER,
  payload: orderId,
});
