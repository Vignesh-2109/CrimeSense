import React from "react";
import { FaEnvelope, FaGithub, FaLinkedin, FaPhone } from "react-icons/fa";

const contact = () => {
  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/your-background.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center px-4">
        <div className="max-w-2xl text-center space-y-6">
          <h1 className="text-5xl font-extrabold text-white">Crime Sense</h1>
          <h2 className="text-2xl text-green-300">
            VIDEO BASED CRIME CLASSIFICATION
          </h2>
          <p className="text-gray-200">
            CrimeSense leverages a state-of-the-art CNN-LSTM pipeline trained on
            the UCF-Crime dataset to analyze video streams in real time,
            automatically detecting and classifying incidents into categories
            like Violent Crime, Property Theft, Destructive Hazard, or
            Legal/Accidental events.
          </p>
          <p className="text-gray-200">
            Try it out: Upload a short video clip and watch CrimeSense flag any
            suspicious activity, display the predicted crime category, and give
            you instant, actionable insights to keep environments safer.
          </p>

          <ul className="text-gray-200 space-y-1">
            <li>
              <span className="font-semibold">Name:</span> Vignesh Maram
            </li>
            <li>
              <span className="font-semibold">ID:</span> 2021BCS-039
            </li>
            <li>
              <span className="font-semibold">Institute:</span> ABV-IIITM
              Gwalior
            </li>
          </ul>

          <div className="flex justify-center space-x-6 text-white text-2xl">
            <a
              href="mailto:vinnumaram@gmail.com"
              aria-label="Email"
              className="hover:text-green-400 transition-colors"
            >
              <FaEnvelope />
            </a>
            <a
              href="https://github.com/Vignesh-2109/Cyberbullying-Detection"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-green-400 transition-colors"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/vignesh-maram-b1209b147/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-green-400 transition-colors"
            >
              <FaLinkedin />
            </a>
            <a
              href="tel:+917801026291"
              aria-label="Phone"
              className="hover:text-green-400 transition-colors"
            >
              <FaPhone />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default contact;
