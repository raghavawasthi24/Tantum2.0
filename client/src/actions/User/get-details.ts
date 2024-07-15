"use server";

export const getDetails = async (data: any) => {
  console.log(data);

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

    const responseJson = await res.json();
    console.log("res", responseJson);

    if (res.status === 200) {
      return responseJson;
    } else {
      console.error(`Error: ${res.status} ${res.statusText}`);
      return null; // Or handle the error as needed
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return null; // Or handle the error as needed
  }
};
