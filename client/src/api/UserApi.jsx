import { useAuth0 } from "@auth0/auth0-react";
import { data } from "autoprefixer";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

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

    if (resp.status !== 200 && resp.status !== 201) {
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

export const useUpdateUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateUserReq = async (formData) => {
    // console.log(formData);
    const accesToken = await getAccessTokenSilently();
    const resp = await axios.post("/user/update-user", formData, {
      headers: {
        Authorization: `Bearer ${accesToken}`,
        "Content-Type": "application/json",
      },
    });
    // console.log(resp);

    if (resp.statusText !== "OK") {
      throw new Error("Failed to update user");
    }

    return resp;
  };

  const {
    mutateAsync: updateUser,
    isLoading,
    isError,
    error,
    isSuccess,
    reset,
  } = useMutation(updateUserReq);

  if (isSuccess) {
    toast.success("User profile updated!");
  }

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { updateUser, isLoading };
};

export const useGetUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getUserReq = async () => {
    const accesToken = await getAccessTokenSilently();
    const resp = await axios.get("/user/get-user", {
      headers: {
        Authorization: `Bearer ${accesToken}`,
        "Content-Type": "application/json",
      },
    });
    console.log(resp);    

    if (resp.statusText !== "OK") {
      throw new Error("Failed to get user");
    }

    return {...resp.data};
  };

  const {
    data: getUser,
    isLoading,
    error,
  } = useQuery("fetchCurrentUser", getUserReq);

  if(error){
    toast.error(error.toString());
  }

  // console.log(data);
  

  return {getUser,isLoading}
};
