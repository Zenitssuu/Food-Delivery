import {
  useCreateRestaurant,
  useGetRestaurant,
  useUpdateResturant,
} from "@/api/RestaurantApi.jsx";
import ManageResturantForm from "@/components/forms/ResturantForm/ManageResturantForm.jsx";
import React from "react";

function ManageResturantPage() {
  const { createRestaurant, isLoading: createLoading } = useCreateRestaurant();
  const { restaurant, isLoading: fetchLoading } = useGetRestaurant();
  const { updateRestaurant, isLoading: updateLoading } = useUpdateResturant();

  const isUpdating = !!restaurant; //!! => means given bolean value

  return (
    <ManageResturantForm
      onSave={isUpdating ? updateRestaurant : createRestaurant}
      isLoading={createLoading || updateLoading}
      restaurant={restaurant}
    />
  );
}

export default ManageResturantPage;
