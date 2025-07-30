import React from "react";
import { Button } from "../ui/button.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import UsernameMenu from "./UsernameMenu.jsx";
import { Link } from "react-router-dom";
import { TruckIcon } from "lucide-react";

function MainNav() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  return (
    <span className="flex space-x-2 items-center">
      {isAuthenticated ? (
        <>
          <Link
            to="/order-status"
            className="hover:text-orange-500 transition-colors"
            title="Order Status"
          >
            <TruckIcon className="h-6 w-6 text-orange-500" />
          </Link>
          <UsernameMenu />
        </>
      ) : (
        <Button
          variant="ghost"
          className="font-bold hover:text-orange-500 hover:bg-white"
          onClick={async () => await loginWithRedirect()}
        >
          Log In
        </Button>
      )}
    </span>
  );
}

export default MainNav;
