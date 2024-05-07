"use client";
import Image from "next/image";
import React from "react";
import MicrosoftLogin from "react-microsoft-login";

export default function MsLogin() {
  const authHandler = (err:any, data:any) => {
    console.log(err, data);
  };
  return (
    <div className="border w-10 h-10 flex justify-center items-center">
      <MicrosoftLogin
        clientId="c0445f42-bb19-4e08-a8f5-05d8aa3fb7a5"
        authCallback={authHandler}
      >
        <Image
          src="/assets/microsoft.png"
          alt="ms-logo"
          width={50}
          height={50}
        />
      </MicrosoftLogin>
    </div>
  );
}
