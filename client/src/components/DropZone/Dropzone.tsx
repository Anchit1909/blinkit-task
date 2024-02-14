"use client";

import { File } from "lucide-react";
import React, { Dispatch, FunctionComponent, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const DropZoneComponent: FunctionComponent<{ setFile: Dispatch<any> }> = ({
  setFile,
}) => {
  const onDrop = useCallback((acceptedFiles: any) => {
    setFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: {
        "image/png": [".png"],
        "image/jpeg": [".jpeg"],
      },
    });
  return (
    <div
      {...getRootProps()}
      className="w-full h-[330px] rounded-md cursor-pointer focus:outline-none"
    >
      <input {...getInputProps()} />
      <div
        className={
          "flex flex-col items-center h-auto space-y-6 border-2 border-dashed border-[#ea580c] rounded-xl py-8 " +
          (isDragReject == true ? "border-red-300" : " ") +
          (isDragAccept == true ? "border-green-300" : " ")
        }
      >
        <File className="h-8 w-8" />
        {isDragReject ? (
          <p className="pb-2 text-sm font-semibold text-center font-default">
            Sorry, This app only supports images.
          </p>
        ) : (
          <>
            <div className="max-w-lg px-6 text-xl font-semibold text-center font-default">
              <h1>Drag and drop your files or</h1>{" "}
              <span className="text-[#ea580c] underline">browse</span>
            </div>
            <p className="text-sm font-default">
              Only jpeg and png files are supported.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default DropZoneComponent;
