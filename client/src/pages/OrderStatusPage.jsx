import { useGetUserOrder } from "@/api/OrderApi.jsx";
import OrderStatusDetail from "@/components/custom/OrderStatusDetail.jsx";
import OrderStatusHeader from "@/components/custom/OrderStatusHeader.jsx";
import { AspectRatio } from "@/components/ui/aspect-ratio.jsx";
import React from "react";

function OrderStatusPage() {
  const { order, isLoading } = useGetUserOrder();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (!order || order.length === 0) {
    return <span>No orders found</span>;
  }
  // console.log(order);

  return (
    <div className="space-y-10">
      {order.slice(0).reverse().map((currOrder) => (
        <div
          key={currOrder._id}
          className="space-y-10 bg-gray-50 p-10 rounded-lg"
        >
          <OrderStatusHeader order={currOrder} />

          <div className="grid gap-10 md:grid-cols-2">
            <OrderStatusDetail order={currOrder} />
            <AspectRatio ratio={16 / 5}>
              <img
                src={currOrder.restaurant.imageUrl}
                alt="restaurant image"
                className=" rounded-md object-cover h-full w-full"
              />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderStatusPage;
