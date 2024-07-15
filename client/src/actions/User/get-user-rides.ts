"use server";

export const getRideDetails = async (data: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/get-ride-details/${data.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  if (res.ok) return await res.json();
};
