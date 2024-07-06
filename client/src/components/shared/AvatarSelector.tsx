"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoCloudUploadOutline } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import RadialProgress from "@/components/shared/radial-progress";
import { uploadImageToCloudinary } from "@/actions/AvatarUpload";
// import { AxiosProgressEvent } from "axios";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const uploadPreset = process.env.NEXT_PUBLIC_UPLOAD_PRESET;

interface ImageUploadProps {
  onUploadComplete?: (url: string) => void;
  form: any;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onUploadComplete,
  form,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploadedImagePath, setUploadedImagePath] = useState<string | null>(
    null
  );

  const onUploadProgress = (progressEvent: any) => {
    if (progressEvent.total) {
      const percentage = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setProgress(percentage);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("event.target.files", event.target.files);
    if (event.target.files?.length) {
      const image = event.target.files[0];
      setSelectedImage(image);
      handleImageUpload(image);
    }
  };

  const removeSelectedImage = () => {
    setLoading(false);
    setUploadedImagePath(null);
    setSelectedImage(null);
  };

  const handleImageUpload = async (image: File) => {
    if (!image) return;
    setLoading(true);

    console.log(image, uploadPreset, apiKey);

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", uploadPreset as string);
    formData.append("api_key", apiKey as string);

    console.log("formData contents:");

    try {
      const res: any = await uploadImageToCloudinary(
        formData,
      );

      console.log("res", res, res.url);
      if (res) {
        setLoading(false);
        setUploadedImagePath(res.url);
        form.setValue("avatar", res.url);
        if (onUploadComplete) {
          onUploadComplete(res.url);
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Error uploading image:", error);
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const image = acceptedFiles[0];
      setSelectedImage(image);
      handleImageUpload(image);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className=" w-1/2 h-full p-6 flex flex-col items-center gap-4">
      <div {...getRootProps()} className="h-full">
        <label
          htmlFor="dropzone-file"
          className="relative flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 w-64 h-64 visually-hidden-focusable"
        >
          {loading && (
            <div className="text-center max-w-md">
              <p className="">Uploading...</p>
            </div>
          )}

          {!loading && !uploadedImagePath && (
            <div className="text-center">
              <div className="border p-2 rounded-md max-w-min mx-auto">
                <IoCloudUploadOutline size="1.6em" />
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Drag an image</span>
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-400">
                Select an image or drag here to upload directly
              </p>
            </div>
          )}

          {uploadedImagePath && !loading && (
            <div className="text-center w-full h-full rounded-full overflow-hidden">
              <Image
                width={250}
                height={250}
                src={uploadedImagePath}
                className="object-cover w-full h-full"
                alt="uploaded image"
              />
            </div>
          )}
        </label>

        <Input
          {...getInputProps()}
          accept="image/png, image/jpeg"
          type="file"
          className="hidden"
          disabled={loading || uploadedImagePath !== null}
          onChange={handleImageChange}
        />
      </div>

      {!!uploadedImagePath && (
        <Button
          onClick={removeSelectedImage}
          type="button"
          variant="destructive"
          className="rounded-lg"
        >
          {uploadedImagePath ? "Remove" : "Close"}
        </Button>
      )}
    </div>
  );
};

export default ImageUpload;
