"use server";

export const handleSuccess = (credentialResponse: any) => {
  console.log(credentialResponse);
};

export const handleError = () => {
  console.log("Login Failed");
};