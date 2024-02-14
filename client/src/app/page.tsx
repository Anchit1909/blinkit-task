"use client";

import DropZoneComponent from "@/components/DropZone/Dropzone";
import Gallery from "@/components/ImageGallery/Gallery";
import RenderFile from "@/components/RenderFile/RenderFile";
import axios from "axios";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [media, setmedia] = useState([]);

  const [file, setFile] = useState<any>(null);
  const [uploadState, setUploadState] = useState<
    "Uploading" | "Upload Failed" | "Uploaded" | "Upload"
  >("Upload");

  const handleUpload = async () => {
    if (uploadState == "Uploading") return;
    setUploadState("Uploading");
    const formData = new FormData();
    formData.append("myFile", file);
    try {
      const { data } = await axios({
        method: "post",
        data: formData,
        url: `${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/api/image/uploadmedia`,
        headers: {
          "Content-Type": "multipart/form-data",
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      if (data) setUploadState("Uploaded");
    } catch (error: any) {
      console.error(error);
      setUploadState("Upload Failed");
    }
  };

  const resetComponent = () => {
    setFile(null);
    setUploadState("Upload");
  };

  const fetchAllMedia = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/api/image/getall`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      if (response.data.success === true) {
        setmedia(response.data.media);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (uploadState === "Uploaded" || uploadState === "Upload") {
      fetchAllMedia();
    }
  }, [uploadState]);

  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      router.push("/signup");
    }
  }, []);
  return (
    <main className="mx-auto w-full max-w-screen-xl px-2.5 md:px-20 py-10">
      <DropZoneComponent setFile={setFile} />
      {file && (
        <RenderFile
          file={{
            format: file.type.split("/")[1],
            name: file.name,
            sizeInBytes: file.size,
          }}
        />
      )}
      {file && (
        <button
          className="group mx-auto mt-6 flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black font-default dark:bg-white dark:text-black dark:hover:bg-stone-800 dark:hover:text-white"
          onClick={handleUpload}
        >
          <Upload className="h-5 w-5 text-white group-hover:text-black dark:text-black dark:group-hover:text-white" />
          <p>{uploadState}</p>
        </button>
      )}
      {uploadState === "Uploaded" && (
        <button
          className="group mx-auto mt-6 flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black font-default dark:bg-white dark:text-black dark:hover:bg-stone-800 dark:hover:text-white"
          onClick={resetComponent}
        >
          <Upload className="h-5 w-5 text-white group-hover:text-black dark:text-black dark:group-hover:text-white" />
          <p>Upload new file</p>
        </button>
      )}
      <div className="flex flex-col mt-4">
        <h3 className="font-semibold text-xl">Image Gallery</h3>
        <Gallery media={media} />
      </div>
    </main>
  );
}
