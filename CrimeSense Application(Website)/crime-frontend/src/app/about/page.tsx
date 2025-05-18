"use client";

import React from "react";

export default function AboutPage() {
  return (
    <div className="scroll-smooth">
      {/* Table of Contents */}
      <nav className="sticky top-0 bg-white shadow-md z-20">
        <ul className="flex justify-center space-x-6 py-4 px-2">
          {[
            { href: "#abstract", label: "Abstract" },
            { href: "#introduction", label: "Introduction" },
            { href: "#dataset", label: "Dataset" },
            { href: "#preprocessing", label: "Data Preprocessing" },
            { href: "#exploration", label: "Model Exploration" },
            { href: "#results", label: "Results" },
          ].map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="max-w-4xl mx-auto py-12 px-4 space-y-16 text-gray-800">
        <h1 className="text-5xl font-extrabold text-center text-gray-900">
          CrimeSense
        </h1>

        {/* Abstract */}
        <section id="abstract" className="space-y-4">
          <h2 className="text-3xl font-semibold text-indigo-600">Abstract</h2>
          <p>
            CrimeSense is a real-time video-based crime classification system that
            leverages a hybrid CNN–BiLSTM architecture for spatial-temporal analysis.
            By automatically detecting and classifying criminal activities in both
            live and recorded surveillance footage, CrimeSense aims to reduce
            human operator fatigue and dramatically improve response times.
          </p>
        </section>

        {/* Introduction */}
        <section id="introduction" className="space-y-4">
          <h2 className="text-3xl font-semibold text-indigo-600">
            Introduction
          </h2>
          <p>
            In the past decade, the deployment of closed-circuit television (CCTV)
            and IP-based surveillance cameras has proliferated across urban and
            rural landscapes alike. From city streets and transit hubs to retail
            stores and office buildings, cameras continuously record streams of
            video, generating petabytes of data every day. Paradoxically, this
            abundance has created a “needle in a haystack” problem: human
            operators monitoring hundreds of feeds suffer fatigue and tunnel
            vision, leading to missed events and delayed responses.
          </p>
          <p>
            Automated video analytics systems now leverage advances in computer
            vision and deep learning to assist—or even replace—manual monitoring.
            Whereas early systems focused on motion detection or anomaly
            flagging, CrimeSense advances the state of the art by classifying
            specific crime types—violent assault, shoplifting, road accident,
            arson—from untrimmed surveillance footage, empowering rapid,
            context-aware responses for law enforcement and security operators.
          </p>
        </section>

        {/* Dataset */}
        <section id="dataset" className="space-y-4">
          <h2 className="text-3xl font-semibold text-indigo-600">Dataset</h2>
          <p>
            We use the UCF-Crime dataset, introduced in 2018, which comprises
            1,900 real-world surveillance videos spanning thirteen anomaly
            categories (Arson, Burglary, Explosion, Fighting, Robbery,
            Shoplifting, Shooting, Stealing, Vandalism, Abuse, Assault, Arrest,
            RoadAccidents) and normal scenes. Videos range from 30 seconds to
            30 minutes, under varying resolutions, camera angles, and lighting
            conditions—including dim corridors and sun-glared parking lots—providing
            a realistic benchmark for crime classification.
          </p>
          <p>
            For our binary detection task (Crime vs. Normal), we balance 900 Crime
            videos against 900 Normal, with an 80/10/10 train/val/test split.
            For four-way classification, we group anomalies into Violent,
            Property Theft, Destructive, and Legal/Accidental super-classes,
            each with 250 examples (200 train, 25 val, 25 test).
          </p>
        </section>

        {/* Data Preprocessing */}
        <section id="preprocessing" className="space-y-4">
          <h2 className="text-3xl font-semibold text-indigo-600">
            Data Preprocessing
          </h2>
          <p>
            Surveillance footage often suffers from uneven illumination,
            sensor noise, and low contrast. To mitigate this, we apply
            Contrast-Limited Adaptive Histogram Equalization (CLAHE) on each
            64×64 frame in the LAB color space. CLAHE operates on 8×8-pixel
            tiles with a clip limit of 2.0, preventing noise bursts and halo
            artifacts. Tiles are then bilinearly interpolated for a smooth
            result, enhancing local contrast without distorting colors.
          </p>
          <p>
            Empirically, CLAHE accelerates convergence (≈3% early-epoch
            accuracy boost) and yields a ~1.1% final accuracy gain on
            binary detection, with negligible per-frame overhead (~1 ms CPU
            or faster with GPU).
          </p>
        </section>

        {/* Model Exploration */}
        <section id="exploration" className="space-y-4">
          <h2 className="text-3xl font-semibold text-indigo-600">
            Model Exploration
          </h2>
          <p>We benchmarked four frame-temporal pipelines under identical preprocessing:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              <strong>Basic CNN + LSTM:</strong> Three Conv2D → ReLU → Pool layers
              per frame (32 filters), features fed to LSTM(128). Lightweight
              (~0.8 M params) but limited on subtle anomalies.
            </li>
            <li>
              <strong>VGG16 + LSTM:</strong> TimeDistributed VGG16 backbone (138 M params)
              + LSTM(128). High accuracy but heavy and prone to overfitting.
            </li>
            <li>
              <strong>ResNet50 + LSTM:</strong> TimeDistributed ResNet50 (25 M params)
              + LSTM. Good depth/generalization but uni-directional context.
            </li>
            <li>
              <strong>DenseNet121 + LSTM:</strong> TimeDistributed DenseNet121 (7 M params)
              + LSTM. Strong feature reuse but still uni-directional.
            </li>
            <li>
              <strong>Our Hybrid CNN–BiLSTM:</strong> Residual spatial blocks,
              SpatialDropout1D for map-level regularization, bidirectional
              LSTM for full pre/post-anomaly context, all in ~1.2 M params.
            </li>
          </ul>
        </section>

        {/* Results */}
        <section id="results" className="space-y-4">
          <h2 className="text-3xl font-semibold text-indigo-600">
            Results of Our Approach
          </h2>
          <p>
            On the 200-video binary test (100 Normal, 100 Crime), our hybrid
            CNN–BiLSTM achieves 94.0% accuracy, 99.90% precision, and 99.85%
            recall, with only six total misclassifications.
          </p>
          <p>
            For four-way classification (50 videos/class), we attain 95.62%
            accuracy. Per-class F1: Destructive 0.965, Legal/Accidental 0.960,
            Property Theft 0.945, Violent 0.955. Misclassifications cluster
            among visually similar classes, suggesting future fusion with
            metadata or object-detection subnets.
          </p>
        </section>
      </div>
    </div>
  );
}
