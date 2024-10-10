import { useGetUser, useUpdateUser } from "@/api/UserApi.jsx";
import UserProfileForm from "@/components/forms/UserProfileForm.jsx";
import React from "react";

function UserProfilePage() {
  const { updateUser, isLoading: isUpdateLoading } = useUpdateUser();
  const { getUser, isLoading: isGetLoading } = useGetUser();

  if(isGetLoading){
    return <span>Loading...</span>
  }

  if(!getUser){
    return <span>Unable to load user profile</span>
  }

//   console.log(getUser);
  
  return (
        <UserProfileForm
        getUser={getUser.user}
        onSave={updateUser} 
        Loading={isUpdateLoading} 
        />
    );  
}

export default UserProfilePage;
