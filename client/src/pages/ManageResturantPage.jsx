import {
  useCreateRestaurant,
  useGetRestaurant,
  useGetRestaurantOrders,
  useUpdateResturant,
} from "@/api/RestaurantApi.jsx";
import OrderItemCard from "@/components/custom/OrderItemCard.jsx";
import ManageResturantForm from "@/components/forms/ResturantForm/ManageResturantForm.jsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.jsx";
import React from "react";

function ManageResturantPage() {
  const { createRestaurant, isLoading: createLoading } = useCreateRestaurant();
  const { restaurant, isLoading: fetchLoading } = useGetRestaurant();
  const { updateRestaurant, isLoading: updateLoading } = useUpdateResturant();

  const isUpdating = !!restaurant; //!! => means given bolean value

  const { orders } = useGetRestaurantOrders();

  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
      </TabsList>
      <TabsContent
        value="orders"
        className="space-y-5 bg-gray-50 p-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold">{orders?.length} active orders</h2>

        {orders
          ?.slice(0)
          .reverse()
          .map((order) => (
            <OrderItemCard key={order?._id} order={order} />
          ))}
      </TabsContent>

      <TabsContent value="manage-restaurant">
        <ManageResturantForm
          onSave={isUpdating ? updateRestaurant : createRestaurant}
          isLoading={createLoading || updateLoading}
          restaurant={restaurant}
        />
      </TabsContent>
    </Tabs>
  );
}

export default ManageResturantPage;
