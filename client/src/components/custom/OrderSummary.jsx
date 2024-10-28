import React from "react";
import { CardContent, CardHeader, CardTitle } from "../ui/card.jsx";
import { Badge } from "../ui/badge.jsx";
import { Trash } from "lucide-react";
import { Separator } from "../ui/separator.jsx";

function OrderSummary({ restaurant, cartItems, removeFromCart }) {
  const getTotalCost = () => {
    const totalCost = cartItems?.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );

    const totalWithDelivery = totalCost + restaurant.deliveryPrice;

    return totalWithDelivery.toFixed(2);
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Your order</span>
          <span>Rs {getTotalCost()}</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        {cartItems?.map((item) => (
          <div key={item.name} className="flex justify-between">
            <span>
              <Badge variant="outline" className="mr-2">
                {item.quantity}
              </Badge>
              {item.name}
            </span>
            <span className="flex items-center gap-1">
              <Trash
                className="cursor-pointer"
                color="red"
                size={20}
                onClick={() => removeFromCart(item)}
              />
              Rs {(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>Rs {restaurant.deliveryPrice.toFixed(2)}</span>
        </div>
        <Separator />
      </CardContent>
    </>
  );
}

export default OrderSummary;
