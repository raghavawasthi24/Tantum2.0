"use server";
import { LoginSchema, VerifyOtpSchema } from "@/schemas/Login";
import { z } from "zod";

export const registerAction = async (data: z.infer<typeof LoginSchema>) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  // Check if response is okay and handle different status codes
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "An error occurred");
  }

  // Parse response data
  const resData = await res.json();
  return resData.message;
};

export const loginAction = async (data: z.infer<typeof LoginSchema>) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const resData = await res.json();

  // Parse response data
  if (res.status === 200) return resData;
  else throw new Error(resData.message || "An error occurred");
};

export const VerifyOtpAction = async (data: z.infer<typeof VerifyOtpSchema>) => {
  console.log(data);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify-login-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  // Check if response is okay and handle different status codes
  console.log(res);
  if (!res.ok) {
    const errorData = await res.json();
    console.log(errorData);
    throw new Error(errorData.message || "An error occurred");
  }

  // Parse response data
  const resData = await res.json();
  console.log(resData);
  return resData.message;
};

export const resendOtpAction = async (data: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/send-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      cache: "no-store",
    },
    body: JSON.stringify(data),
  });

  // Check if response is okay and handle different status codes
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "An error occurred");
  }

  // Parse response data
  const resData = await res.json();
  return resData.message;
};



export const forgotPasswordAction = async (data: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/forgot-password?email=${data.email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      cache: "no-store",
    },
  });

  // Check if response is okay and handle different status codes
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "An error occurred");
  }

  // Parse response data
  const resData = await res.json();
  return resData.message;
}