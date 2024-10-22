import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

export const useCreateRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createRestaurantReq = async (formData) => {
    const accessToken = await getAccessTokenSilently();

    const resp = await axios.post("/restaurant/create-restaurant", formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (resp.status !== 200 && resp.status !== 201) {
      throw new Error("Failed to create restaurant");
    }

    return resp.data;
  };

  const {
    mutateAsync: createRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createRestaurantReq);

  if (isSuccess) {
    toast.success("Restaurant sucessfully created");
  }

  if (error) {
    toast.error("Unable to update resturant");
  }

  return { createRestaurant, isLoading };
};

export const useGetRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getUserRestaurantReq = async () => {
    const accessToken = await getAccessTokenSilently();

    const resp = await axios.get("/restaurant/get-restaurant", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (resp.status !== 200) {
      throw new Error("Failed to find restaurant");
    }

    return resp.data;
  };

  const { data: restaurant, isLoading } = useQuery(
    "getUserRestaurant",
    getUserRestaurantReq
  );

  return { restaurant, isLoading };
};
