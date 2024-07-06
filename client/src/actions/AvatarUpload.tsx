import toast from "react-hot-toast";

export interface UserData {
  image: string;
}

// const API_BASE_URL = "https://reqres.in/api/users";

export const updateUserData = async (data: UserData) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 201) {
      const responseData = await response.json();
      toast.success("User profile updated successfully...");
      return responseData;
    } else {
      const errorText = await response.text();
      toast.error(errorText);
      throw new Error(errorText);
    }
  } catch (error: any) {
    toast.error(error.message);
    throw new Error(error.message);
  }
};

export const uploadImageToCloudinary = async (formData:FormData) => {
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

