"use server";

export const getDetails = async (data: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/get-details/${data.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Something went wrong!");
    }

    return await res.json();
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
};
