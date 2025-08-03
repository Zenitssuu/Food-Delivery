import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card.jsx";
import { Separator } from "../ui/separator.jsx";
import { Badge } from "../ui/badge.jsx";
import { Label } from "../ui/label.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select.jsx";
import { ORDER_STATUS } from "@/config/order-status-config.js";
import { useUpdateResturantOrder } from "@/api/RestaurantApi.jsx";

function OrderItemCard({ order }) {
  const { updateOrderStatus, isLoading } = useUpdateResturantOrder();

  const [status, setStatus] = useState(order.status);

  const handleStatusChange = async (newStatus) => {
    await updateOrderStatus({ orderId: order._id, status: newStatus });
    setStatus(newStatus);
  };

  const getTime = () => {
    const orderDateTime = new Date(order.createdAt);

    const hours = orderDateTime.getHours();
    const minutes = orderDateTime.getMinutes();

    const addedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${addedMinutes}`;
  };

  useEffect(() => {
    setStatus(order.status);
  }, [order.status]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
          <div>
            Customer Name:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.name}
            </span>
          </div>

          <div>
            Delivery Address:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.address},{order.deliveryDetails.city}
            </span>
          </div>

          <div>
            Time:
            <span className="ml-2 font-normal">{getTime()}</span>
          </div>

          <div>
            Time:
            <span className="ml-2 font-normal">
              Rs {order?.totalAmount?.toFixed(2)}
            </span>
          </div>
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          {order?.cartItems.map((item) => (
            <span key={item._id}>
              <Badge variant="outline" className="mr-2">
                {item.quantity}
              </Badge>
              {item.name}
            </span>
          ))}
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="status">What is the status of order?</Label>

          <Select
            value={status}
            disabled={isLoading}
            onValueChange={(value) => handleStatusChange(value)}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="status" />
            </SelectTrigger>

            <SelectContent position="popper">
              {ORDER_STATUS.map((currStatus, index) => (
                <SelectItem
                  key={`currStatus+${currStatus.value}+${index}`}
                  value={currStatus.value}
                >
                  {currStatus.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}

export default OrderItemCard;
