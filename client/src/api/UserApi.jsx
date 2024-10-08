import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useMutation } from "react-query";

const CreateUserRequest = {
  auth0Id: String,
  email: String,
};

export const useCreateUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createUserReq = async (CreateUserRequest) => {
    // console.log(CreateUserRequest);
    const accesToken = await getAccessTokenSilently();
    const resp = await axios.post("/user/create-user", CreateUserRequest, {
      headers: {
        Authorization: `Bearer ${accesToken}`,
        "Content-Type": "application/json",
      },
    });

    if (resp.status !== 200 || resp.status !== 200) {
      throw new Error("Failed to fetch user");
    }
    // console.log(resp);
    return resp;
  };

  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createUserReq);

  return {
    createUser,
    isLoading,
    isError,
    isSuccess,
  };
};
