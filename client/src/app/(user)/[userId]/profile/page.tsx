import { getDetails } from "@/actions/User/get-details";
import React from "react";
import ProfilePage from "./profile-page";

export default async function Page({ params }: { params: { userId: string } }) {
  const formValues = await getDetails({ id: params.userId });

  console.log("formValues,", formValues);

  return (
    <div>
      <h1 className="font-bold text-3xl pt-10 pb-3 px-6 bg-blue-400 text-white">
        Profile
      </h1>

      <ProfilePage formValues={formValues} />
    </div>
  );
}
