import React from "react";
import { Button } from "../ui/button.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import UsernameMenu from "./UsernameMenu.jsx";
import { Link } from "react-router-dom";

function MainNav() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  return (
    <span className="flex space-x-2 items-center">
      {isAuthenticated ? (
        <>
          <Link to={"/order-status"} className=" font-bold hover:text-orange-500">
            Order Status
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
