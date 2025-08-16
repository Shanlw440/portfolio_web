// src/components/Hero.jsx

import React from "react";
import "./Hero.css"; // Import the new stylesheet
import laptopGirl from "../assets/typing.json";
import Lottie from "lottie-react";

function Hero() {
  return (
    <section className="hero-section">
      <Lottie animationData={laptopGirl} loop={true} className="hero-lottie" />

      <h1 className="hero-title">
        Hi there! I'm <span className="hero-name">Shannon</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="hero-icon"
          aria-label="Custom icon"
          role="img"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
          />
        </svg>
      </h1>

      <p className="hero-description">
        A <span className="hero-highlight">Data Analyst</span> specialising in telecomms, logistics, supply chain, and sales within luxury brands. I thrive on untangling complex data to deliver clear, actionable insights through creative problem-solving and intelligent automation.
      </p>

      <p className="hero-description">
        Leveraging tools from spreadsheets and SQL to Python and Machine Learning, I build solutions that balance analytical precision with intuitive design, empowering teams to make smarter, data-driven decisions.
      </p>
    </section>
  );
}

export default Hero;