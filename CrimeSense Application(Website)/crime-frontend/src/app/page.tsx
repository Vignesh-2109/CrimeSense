// "use client";

// import { useState } from "react";
// import AboutTab from "./tabs/AboutTab";
// import ImagePredictor from "./tabs/ImagePredictor";
// import VideoPredictor from "./tabs/VideoPredictor";

// export default function Home() {
//   const [activeTab, setActiveTab] = useState("about");

//   return (
//     <main className="min-h-screen bg-white p-10">
//       <h1 className="text-4xl font-bold text-center mb-8 text-black">🕵️ Crime Sense</h1>

//       <div className="flex justify-center gap-4 mb-8">
//         <button
//           className={`px-4 py-2 rounded-md text-black font-medium transition hover:cursor-pointer ${
//             activeTab === "about" ? "bg-indigo-600" : "bg-black-400"
//           }`}
//           onClick={() => setActiveTab("about")}
//         >
//           About the Project
//         </button>
//         <button
//           className={`px-4 py-2 rounded-md text-black font-medium transition hover:cursor-pointer ${
//             activeTab === "video" ? "bg-indigo-600" : "bg-black-400"
//           }`}
//           onClick={() => setActiveTab("video")}
//         >
//           Predict by Video
//         </button>
//       </div>

//       <div className="max-w-5xl mx-auto">
//         {activeTab === "about" && <AboutTab />}
//         {activeTab === "image" && <ImagePredictor />}
//         {activeTab === "video" && <VideoPredictor />}
//       </div>
//     </main>
//   );
// }


// app/page.tsx
"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[calc(100vh-4rem)] space-y-12 bg-amber-100">
      <h1 className="text-6xl font-extrabold text-gray-900">Crime Sense</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <Link
          href="/about"
          className="group w-64 h-40 bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center transition hover:shadow-2xl hover:scale-105"
        >
          <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-indigo-600">
            About
          </h2>
          <p className="text-gray-500 mt-2">Learn the full pipeline</p>
        </Link>

        <Link
          href="/predict"
          className="group w-64 h-40 bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center transition hover:shadow-2xl hover:scale-105"
        >
          <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-indigo-600">
            Predict
          </h2>
          <p className="text-gray-500 mt-2">Upload videos & detect</p>
        </Link>
      </div>
    </div>
  );
}
