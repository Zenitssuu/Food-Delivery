import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useLocation } from "react-router";
import { Button } from "../ui/button.jsx";
import LoadingButton from "./LoadingButton.jsx";

import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog.jsx";
import UserProfileForm from "../forms/UserProfileForm.jsx";
import { useGetUser } from "@/api/UserApi.jsx";

function CheckoutButton({ onCheckout, disabled, isLoading }) {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();

  const { pathname } = useLocation();

  const { isLoading: getUserLoading, getUser } = useGetUser();

  //   console.log(getUser);

  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        // pathname is /detail/:id, it will be returend to this path after login
        returnTo: pathname,
      },
    });
  };

  if (!isAuthenticated) {
    return (
      <Button className="bg-orange-500 flex-1" onClick={onLogin}>
        Log in to checkout
      </Button>
    );
  }

  if (isAuthLoading || !getUser || isLoading) {
    return <LoadingButton />;
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          disabled={disabled || isLoading}
          className="bg-orange-500 flex-1"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </div>
          ) : (
            "Go to checkout"
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[425px md:m-w-[700px] bg-gray-50">
        <UserProfileForm
          getUser={getUser.user}
          onSave={onCheckout}
          isLoading={getUserLoading}
          title="Confirm Delivery Details"
          buttonText="Continut to payment"
        />
      </DialogContent>
    </Dialog>
  );
}

export default CheckoutButton;
