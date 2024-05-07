"use client";
import React, { MouseEventHandler } from "react";
// import { handleError, handleSuccess } from "../function";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

export default function GoogleLogin() {
  const login = useGoogleLogin({
    onSuccess: (response) => {
      console.log("onSuccess", response);
    },
    onError: (response) => {
      console.log("onerror", response);
    },
  });
  return (
    <div
      className="border w-10 h-10 flex justify-center items-center"
      onClick={login as MouseEventHandler<HTMLDivElement>}
    >
      {" "}
      <FcGoogle className="w-8 h-8" />
    </div>
  );
}
