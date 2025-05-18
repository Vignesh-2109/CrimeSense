"use client";

import React from "react";

interface UploadCardProps {
  file: File | null;
  setFile: (file: File | null) => void;
  onUpload: () => void;
  loading: boolean;
  fileType: string; // "image/*" or "video/*"
  label: string; // label for card: "Upload a Video", "Upload an Image"
  inputId: string; // input id to bind label
}

export default function UploadCard({
  file,
  setFile,
  onUpload,
  loading,
  fileType,
  label,
  inputId,
}: UploadCardProps) {
  return (
    <>
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        {label}
      </h2>
      <label
        htmlFor={inputId}
        className="cursor-pointer border-2 border-dashed border-gray-300 rounded-xl p-6 w-full text-center text-gray-500 hover:border-indigo-500 hover:text-indigo-700 transition duration-300"
      >
        {file ? file.name : `Click to choose a ${fileType.includes("image") ? "image" : "video"} file`}
        <input
          id={inputId}
          type="file"
          accept={fileType}
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="hidden"
        />
      </label>
      <button
        onClick={onUpload}
        className="mt-6 w-full bg-indigo-600 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
      >
        {loading ? "Analyzing..." : "Predict"}
      </button>
    </>
  );
}
