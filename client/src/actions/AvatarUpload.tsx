import toast from "react-hot-toast";

export interface UserData {
  image: string;
}

const API_BASE_URL = "https://reqres.in/api/users";

export const updateUserData = async (data: UserData) => {
  try {
    const response = await fetch(API_BASE_URL, {
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
  } catch (error:any) {
    toast.error(error.message);
    throw new Error(error.message);
  }
};


export const uploadImageToCloudinary = async (
  formData: FormData,
  onUploadProgress: (progressEvent: ProgressEvent) => void
) => {
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.upload.onprogress = onUploadProgress;

    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error(xhr.statusText));
      }
    };

    xhr.onerror = () => {
      reject(new Error("An error occurred while uploading the image"));
    };

    xhr.send(formData);
  });
};

