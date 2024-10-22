import { useCreateRestaurant, useGetRestaurant } from "@/api/RestaurantApi.jsx";
import ManageResturantForm from "@/components/forms/ResturantForm/ManageResturantForm.jsx";
import React from "react";

function ManageResturantPage() {
  const { createRestaurant, isLoading } = useCreateRestaurant();
  const {restaurant,isLoading: fetchLoading} = useGetRestaurant()

  return (
    <ManageResturantForm onSave={createRestaurant} isLoading={isLoading} restaurant={restaurant}/>
  );
}

export default ManageResturantPage;
