import React from "react";
import { Separator } from "../ui/separator.jsx";

function OrderStatusDetail({ order }) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col">
        <span className=" font-bold">Delivering to:</span>
        <span>{order.deliveryDetails.name}</span>
        <span>
          {order.deliveryDetails.address}, {order.deliveryDetails.city}
        </span>
        <span>{order.deliveryDetails.email}</span>
      </div>

      <div className="flex flex-col">
        <span className="font-bold">Your order</span>
        <ul>
          {order.cartItems.map((item) => (
            <li key={item.name}>
              {item.name} x {item.quantity}
            </li>
          ))}
        </ul>
      </div>
      <Separator />
      <div className="flex flex-col">
        <span className="font-bold">Your total</span>
        <span>Rs {order.totalAmount.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default OrderStatusDetail;
