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

export const useUpdateResturant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateRestaurantReq = async (formData) => {
    const accessToken = await getAccessTokenSilently();

    const resp = await axios.put("/restaurant/update-restaurant", formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (resp.status !== 200 && resp.status !== 201) {
      throw new Error("Failed to update restaurant");
    }

    return resp.data;
  };

  const {
    mutate: updateRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(updateRestaurantReq);

  if (isSuccess) {
    toast.success("Restaurant sucessfully updated");
  }

  if (error) {
    toast.error("Unable to update resturant");
  }

  return { updateRestaurant, isLoading };
};

export const useGetRestaurantOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getRestaurantOrdersReq = async () => {
    const accessToken = await getAccessTokenSilently();

    const resp = await axios.get("/restaurant/get-order", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (resp.status === 404 || resp.status === 500) {
      throw new Error("failed to get orders");
    }

    return resp.data;
  };

  const { data: orders, isLoading } = useQuery(
    "fetchRestaurantOrders",
    getRestaurantOrdersReq
  );

  return { orders, isLoading };
};

export const useUpdateResturantOrder = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateRestaurantOrderReq = async (newOrderStatusUpdateReq) => {
    const accessToken = await getAccessTokenSilently();
    console.log(newOrderStatusUpdateReq.status);
    
    const resp = await axios.patch(
      `/restaurant/update-order/${newOrderStatusUpdateReq.orderId}/status`,
      {status:newOrderStatusUpdateReq.status},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (resp.status !== 200 && resp.status !== 201) {
      throw new Error("failed to update order status");
    }
  };

  const {
    mutateAsync: updateOrderStatus,
    isLoading,
    isError,
    isSuccess,
    reset
  } = useMutation(updateRestaurantOrderReq);

  if (isError) {
    toast.error("failed to update order status");
    reset();
  }

  if (isSuccess) {
    toast.success("order status updated");
  }

  return { updateOrderStatus, isLoading };
};
