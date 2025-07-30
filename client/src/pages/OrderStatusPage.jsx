import { Link } from "react-router-dom";
import { useGetUserOrder } from "../api/OrderApi.jsx";
import { AspectRatio } from "../components/ui/aspect-ratio.jsx";
import React from "react";
import Skeleton from "react-loading-skeleton";

function OrderStatusPage() {
  const { order, isLoading } = useGetUserOrder();

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-gray-100 p-6 rounded-xl shadow-sm animate-pulse"
          >
            <div className="mb-4">
              <Skeleton className="h-6 w-40 mb-2" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <Skeleton className="h-40 w-full rounded-md" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!order || order.length === 0) {
    return (
      <div className="text-center text-gray-500 py-20 text-lg">
        You haven't placed any orders yet.
      </div>
    );
  }

  const ongoingOrders = order?.filter(
    (o) => o.status?.toLowerCase() !== "delivered"
  );
  const pastOrders = order?.filter(
    (o) => o.status?.toLowerCase() === "delivered"
  );

  // console.log("ongoing", ongoingOrders);
  // console.log("past", pastOrders);

  const renderCard = (currOrder) => {
    if (!currOrder) return null;

    return (
      <Link
        to={`/detail/${currOrder?.restaurant?._id}`}
        key={currOrder._id}
        className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition flex flex-col gap-3"
      >
        <div className="flex items-start gap-4">
          <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
            <AspectRatio ratio={1}>
              <img
                src={currOrder?.restaurant.imageUrl}
                loading="lazy"
                alt="restaurant"
                className="w-full h-full object-cover"
              />
            </AspectRatio>
          </div>

          <div className="flex-1 space-y-1">
            <h3 className="text-lg font-semibold text-orange-600">
              {currOrder?.restaurant.restaurantName}
            </h3>
            <p className="text-sm text-gray-500">
              Ordered on {new Date(currOrder.createdAt).toLocaleDateString()}
            </p>
            <span
              className={`inline-block text-xs px-2 py-1 rounded ${
                currOrder?.status?.toLowerCase() === "delivered"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {currOrder?.status}
            </span>
          </div>
        </div>

        <div className="text-sm text-gray-700 space-y-1">
          <div>
            <span className="font-medium text-gray-900">Items:</span>{" "}
            {currOrder?.cartItems?.map((item) => item.name).join(", ")}
          </div>
          <div>
            <span className="font-medium text-gray-900">Total:</span> ₹
            {currOrder?.totalAmount}
          </div>
          <div>
            <span className="font-medium text-gray-900">Delivered to:</span>{" "}
            {currOrder?.deliveryDetails.address}
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="space-y-10">
      {ongoingOrders?.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-orange-500">
            Ongoing Orders
          </h2>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
            {ongoingOrders.slice().reverse().map(renderCard)}
          </div>
        </section>
      )}

      {pastOrders?.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Past Orders</h2>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
            {pastOrders.slice().reverse().map(renderCard)}
          </div>
        </section>
      )}
    </div>
  );
}

export default OrderStatusPage;
