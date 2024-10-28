import React from "react";
import { Progress } from "../ui/progress.jsx";
import { ORDER_STATUS } from "@/config/order-status-config.js";

function OrderStatusHeader({ order }) {
  // console.log(order);

  const getExpectedDelivery = () => {
    const created = new Date(order.createdAt);

    created.setMinutes(
      created.getMinutes() + order.restaurant.estimatedDeliveryTime
    );

    const hours = created.getHours();
    const minutes = created.getMinutes();

    const addedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${addedMinutes}`;
  };

  const getOrderStatusInfo = () => {
    return (
      ORDER_STATUS.find((currStatus) => currStatus.value === order.status) ||
      ORDER_STATUS[0]
    );
  };

  

  return (
    <>
      <h1 className="text-4xl font-bold tracking-tighter flex flex-col g5 md:flex-row md:justify-between">
        <span className="">Order Status: {getOrderStatusInfo().label}</span>
        <span>Expected by: {getExpectedDelivery()}</span>
      </h1>

      <Progress
        className="animate-pulse"
        value={getOrderStatusInfo().progressValue}
      />
    </>
  );
}

export default OrderStatusHeader;
