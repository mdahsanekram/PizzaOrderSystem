// PizzaOrderDisplay.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { moveToNextStage, cancelOrder } from "../action/Action";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

const PizzaOrderDisplay = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const calculateTimeElapsed = (startTime) => {
    const diff = Math.abs(currentTime - startTime);
    const minutes = Math.floor(diff / (1000 * 60));
    const seconds = Math.floor((diff / 1000) % 60);
    if (minutes) return `${minutes} min ${seconds} sec`;
    else return `${seconds} sec`;
  };

  const handleMoveToNextStage = (orderId) => {
    dispatch(moveToNextStage(orderId));
  };

  const handleCancle = (orderId) => {
    console.log(orderId);
    dispatch(cancelOrder(orderId));
  };

  const alertCondition = (item) => {
    const { size, startTime } = item;
    const time = calculateTimeElapsed(startTime);
    const minut = time.split(" ").length == 4 ? time.split(" ")[0] : 0;
    if (size === "Large" && Number(minut) >= 5) {
      return true;
    }
    if (size === "Medium" && Number(minut) >= 4) {
      return true;
    }
    if (size === "Small" && Number(minut) >= 3) {
      return true;
    }
    return false;
  };

  return (
    <div className="containerFluid">
      <br />
      <h4>Pizza Stages Section</h4>
      <div className="row" style={{ padding: "10px" }}>
        <div
          className="col-md-3 col-sm-3"
          style={{ border: "1px solid black" }}
        >
          <h4> Order Place</h4>
          {orders.map(
            (order) =>
              order.stage === "Order Placed" && (
                <div key={order.id}>
                  <Card
                    style={{
                      margin: "10px",
                      width: "8rem",
                      backgroundColor: alertCondition(order) ? "red" : "",
                    }}
                  >
                    <Card.Body>
                      <Card.Title>
                        <p>Order : {order.id}</p>
                      </Card.Title>
                      <Card.Text>
                        {calculateTimeElapsed(order.startTime)}
                      </Card.Text>
                    </Card.Body>
                    <Card.Body>
                      <button onClick={() => handleMoveToNextStage(order.id)}>
                        Next
                      </button>
                    </Card.Body>
                  </Card>
                </div>
              )
          )}
        </div>

        <div
          className="col-md-3 col-sm-3"
          style={{ border: "1px solid black" }}
        >
          <h4> Order in Making</h4>
          {orders.map(
            (order) =>
              order.stage === "Order in Making" && (
                <div key={order.id}>
                  <Card
                    style={{
                      margin: "10px",
                      width: "8rem",
                      backgroundColor: alertCondition(order) ? "red" : "",
                    }}
                  >
                    <Card.Body>
                      <Card.Title>
                        <p>Order : {order.id}</p>
                      </Card.Title>
                      <Card.Text>
                        {calculateTimeElapsed(order.startTime)}
                      </Card.Text>
                    </Card.Body>
                    <Card.Body>
                      <button onClick={() => handleMoveToNextStage(order.id)}>
                        Next
                      </button>
                    </Card.Body>
                  </Card>
                </div>
              )
          )}
        </div>
        <div
          className="col-md-3 col-sm-3"
          style={{ border: "1px solid black" }}
        >
          <h4>Order Ready</h4>
          {orders.map(
            (order) =>
              order.stage === "Order Ready" && (
                <div key={order.id}>
                  <Card
                    style={{
                      margin: "10px",
                      width: "8rem",
                      backgroundColor: alertCondition(order) ? "red" : "",
                    }}
                  >
                    <Card.Body>
                      <Card.Title>
                        <p>Order : {order.id}</p>
                      </Card.Title>
                      <Card.Text>
                        {calculateTimeElapsed(order.startTime)}
                      </Card.Text>
                    </Card.Body>
                    <Card.Body>
                      <button onClick={() => handleMoveToNextStage(order.id)}>
                        Next
                      </button>
                    </Card.Body>
                  </Card>
                </div>
              )
          )}
        </div>
        <div
          className="col-md-3 col-sm-3"
          style={{ border: "1px solid black" }}
        >
          <h4> Order Picked</h4>
          {orders.map(
            (order) =>
              order.stage === "Order Picked" && (
                <div key={order.id}>
                  <Card style={{ width: "8rem" }}>
                    <Card.Body>
                      <Card.Title>
                        <p>Order : {order.id}</p>
                      </Card.Title>
                      <Card.Text>
                        {calculateTimeElapsed(order.startTime)}
                      </Card.Text>
                    </Card.Body>
                    <Card.Body>Picked</Card.Body>
                  </Card>
                </div>
              )
          )}
        </div>
      </div>

      <br />
      <div>
        <h4>Main Section</h4>
        <Table striped bordered>
          {orders.length ? (
            <thead>
              <tr>
                <th scope="col">Order Id</th>
                <th scope="col">Stage</th>
                <th scope="col">Total time spent (time from order placed)</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
          ) : (
            <thead>
              <tr>
                <th style={{ textAlign: "center" }} scope="col">
                  No Item
                </th>
              </tr>
            </thead>
          )}
          <tbody>
            {orders?.map(
              (order, id) =>
                order.stage !== "Order Picked" && (
                  <tr key={id}>
                    {/* <th scope="row">1</th> */}
                    <td>{`Order Id: ${order.id}`}</td>
                    <td>{order.stage}</td>
                    <td>{calculateTimeElapsed(order.orderTime)}</td>
                    <td>
                      <button onClick={() => handleCancle(order.id)}>
                        Canle
                      </button>
                    </td>
                  </tr>
                )
            )}
            {orders?.map(
              (order, id) =>
                order.stage === "Order Picked" && (
                  <tr key={id}>
                    {/* <th scope="row">1</th> */}
                    <th scope="row">Total order delivered</th>
                    <th>
                      <td>{order.id}</td>
                    </th>
                    <td></td>
                  </tr>
                )
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default PizzaOrderDisplay;
