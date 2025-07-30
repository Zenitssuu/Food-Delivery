import { useGetUser, useUpdateUser } from "@/api/UserApi.jsx";
import UserProfileForm from "@/components/forms/UserProfileForm.jsx";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function UserProfilePage() {
  const { updateUser, isLoading: isUpdateLoading } = useUpdateUser();
  const { getUser, isLoading: isGetLoading } = useGetUser();

  if (isGetLoading) {
    return (
      <div className="max-w-xl mx-auto px-4 py-10 space-y-6">
        <div>
          <Skeleton height={30} width={200} />
        </div>
        <div className="space-y-4">
          <Skeleton height={20} />
          <Skeleton height={20} width="60%" />
          <Skeleton height={20} />
          <Skeleton height={20} width="80%" />
        </div>
        <div className="pt-4">
          <Skeleton height={40} width={120} />
        </div>
      </div>
    );
  }

  if (!getUser) {
    return (
      <div className="text-center text-red-500 py-10 font-semibold">
        Unable to load user profile
      </div>
    );
  }

  return (
    <UserProfileForm
      getUser={getUser.user}
      onSave={updateUser}
      Loading={isUpdateLoading}
    />
  );
}

export default UserProfilePage;
