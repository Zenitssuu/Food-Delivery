import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

export const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createSessionCheckoutReq = async (checkoutSessionReq) => {
    const accessToken = await getAccessTokenSilently();
    const resp = await axios.post(
      "/order/checkout/create-checkout-session",
      checkoutSessionReq,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (resp.status === 404 || resp.status === 500) {
      throw new Error("Unable to create checkout session ");
    }
    // console.log(resp.data);

    return resp.data;
  };

  const {
    mutateAsync: createCheckoutSession,
    isLoading,
    error,
    reset,
  } = useMutation(createSessionCheckoutReq);

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { createCheckoutSession, isLoading };
};

export const useGetUserOrder = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getUserOrderReq = async () => {
    const accessToken = await getAccessTokenSilently();
    const resp = await axios.get("/order", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (resp.status === 404 || resp.status === 500) {
      throw new Error("order not found");
    }

    return resp.data;
  };

  const { data: order, isLoading } = useQuery(
    "fetchUserOrder",
    getUserOrderReq,
    {
      refetchInterval: 5000, //fetch order status in every 5sec so that user dont have to refersh again and again
    }
  );

  return { order, isLoading };
};
