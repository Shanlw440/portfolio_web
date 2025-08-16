// src/components/AboutMe.jsx

import React from "react";
import "./AboutMe.css"; // This file is correct, no changes needed here

function AboutMe() {
  return (
    <section
      id="about"
      className="about-me-section"
      style={{
        position: "relative", // The fix: This was missing, so zIndex wasn't working
        zIndex: 2,
      }}
    >
      <h2>About Me</h2>

      <p>
        Hi, I'm Shannon, and I love all things data.
      </p>

      <p>
        My interest wasn't sparked by a single report, but through years of hands-on work. It started with spreadsheets in logistics, grew while creating stock-ordering reports in supply chain, and truly ignited when I automated the CEO’s sales reporting at a luxury fragrance brand. Seeing the immediate impact of smart data solutions got me hooked.
      </p>

      <p>
        This practical foundation led me to dive deeper, earning a Data Analyst certification from ITOnlineLearning. Since then, I've been committed to continuous growth, exploring new tools, and tackling increasingly complex challenges across analytics, automation, and reporting. For me, data analysis feels like being an architect using numbers and code as building blocks to create clarity and efficiency.
      </p>
      
      <p>
         Check out my projects below - all data is either sourced from Kaggle or generated using synthetic (fake) datasets for demonstration purposes.
      </p>
    </section>
  );
}

export default AboutMe;