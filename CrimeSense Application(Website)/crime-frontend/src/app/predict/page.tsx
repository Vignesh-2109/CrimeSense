
"use client";

import { useState } from "react";
import axios from "axios";

export default function PredictPage() {
  const [file, setFile] = useState<File | null>(null);

  // detection
  const [detectResult, setDetectResult] = useState<"Yes" | "No" | null>(null);
  const [loadingDetect, setLoadingDetect] = useState(false);

  // local preview
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  // ask before classifying
  const [askClassify, setAskClassify] = useState(false);

  // classification
  const [classifyResult, setClassifyResult] = useState<string | null>(null);
  const [loadingClassify, setLoadingClassify] = useState(false);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

  // Step B: detect crime
  const handleDetect = async () => {
    if (!file) return;
    setLoadingDetect(true);

    // reset downstream
    setDetectResult(null);
    setVideoSrc(null);
    setAskClassify(false);
    setClassifyResult(null);

    const form = new FormData();
    form.append("file", file);

    try {
      const { data } = await axios.post(
        `${API_URL}/detect_crime`,
        form,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setDetectResult(data.crime);
      setVideoSrc(URL.createObjectURL(file));

      if (data.crime === "Yes") {
        setAskClassify(true);
      }
    } catch {
      setDetectResult("No");
      setVideoSrc(URL.createObjectURL(file));
    } finally {
      setLoadingDetect(false);
    }
  };

  // Step C: classify into 4 classes
  const handleClassify = async () => {
    if (!file) return;
    setLoadingClassify(true);

    const form = new FormData();
    form.append("file", file);

    try {
      const { data } = await axios.post(
        `${API_URL}/predict_class`,
        form,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setClassifyResult(data.type);
    } catch {
      setClassifyResult("Unknown");
    } finally {
      setLoadingClassify(false);
      setAskClassify(false);
    }
  };

  // Reset everything
  const handleReset = () => {
    setFile(null);
    setDetectResult(null);
    setVideoSrc(null);
    setAskClassify(false);
    setClassifyResult(null);
  };

  return (
    <div className="h-screen bg-gray-800 py-10 px-4 ">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-8 space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Predict Crime
        </h1>

        {/* File input */}
        {!detectResult && (
          <div className="flex flex-col items-center space-y-4">
            <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-indigo-600 hover:text-indigo-800 border-2 border-dashed border-indigo-300 rounded-lg cursor-pointer transition-colors">
              <span className="text-lg font-medium">
                {file ? file.name : "Select a video file"}
              </span>
              <input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0] ?? null;
                  setFile(f);
                  // reset previous results if choosing a new file
                  setDetectResult(null);
                  setVideoSrc(null);
                  setAskClassify(false);
                  setClassifyResult(null);
                }}
              />
            </label>

            {/* Predict button */}
            {file && (
              <button
                onClick={handleDetect}
                disabled={loadingDetect}
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors cursor-pointer"
              >
                {loadingDetect ? "Analyzing…" : "Predict"}
              </button>
            )}
          </div>
        )}

        {/* Loading skeleton */}
        {loadingDetect && (
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded animate-pulse" />
            <div className="h-60 bg-gray-200 rounded animate-pulse" />
          </div>
        )}

        {/* Detection & subsequent steps */}
        {detectResult && (
          <div className="space-y-6">
            <div
              className={`text-center text-xl font-semibold ${
                detectResult === "Yes"
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {detectResult === "Yes"
                ? "🚨 It's a Crime!"
                : "✅ It's a Normal Video"}
            </div>

            {/* Video Preview */}
            {videoSrc && (
              <video
                src={videoSrc}
                controls
                className="w-full rounded-lg shadow-md"
              />
            )}

            {/* If crime: ask or show classify */}
            {detectResult === "Yes" && askClassify && (
              <div className="flex flex-col items-center space-y-4">
                <p className="text-gray-700">
                  Would you like to classify the crime type?
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={handleClassify}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors cursor-pointer"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setAskClassify(false)}
                    className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors cursor-pointer"
                  >
                    No
                  </button>
                </div>
              </div>
            )}

            {detectResult === "Yes" && !askClassify && !classifyResult && (
              <div className="text-center">
                <button
                  onClick={() => setAskClassify(true)}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors cursor-pointer"
                >
                  🔍 Classify Crime
                </button>
              </div>
            )}

            {/* Classification result */}
            {classifyResult && (
              <div className="text-center space-y-2">
                <p className="text-gray-700">Category:</p>
                <span className="inline-block bg-indigo-100 text-indigo-800 font-semibold px-4 py-2 rounded-lg shadow">
                  {classifyResult.replace("_", " ")}
                </span>
              </div>
            )}

            {/* Predict Another Video */}
            <div className="text-center pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
              >
                Predict Another Video
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
