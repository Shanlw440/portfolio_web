// src/components/Projects.jsx
import React from "react";
import "./Projects.css";

function Projects() {
  return (
    <section
      id="projects"
      className="projects-section"
      style={{ position: "relative", zIndex: 2 }}
    >
      <h2 className="projects-title">Projects</h2>

      {/* ---------- DQ-AI — Data Quality Auditor (EMBED) ---------- */}
      <div className="project-card">
        <div className="project-info">
          <h3 className="project-title">DQ-AI — Data Quality Auditor</h3>
          <p className="project-description">
            A free web app to speed up <strong>data cleaning</strong>. Upload a CSV/XLSX, hit <em>Run Audit</em>, and
            get a tidy HTML report: health score, missing values, duplicates, IQR outliers, invalid emails/postcodes,
            rare categories, type drift, date issues, plus row-level examples. Files are processed in memory only —
            nothing is stored.
          </p>
          <div className="project-skills">
            <span className="skill-tag">Python</span>
            <span className="skill-tag">Dash</span>
            <span className="skill-tag">Plotly</span>
            <span className="skill-tag">Pandas</span>
            <span className="skill-tag">Data Cleaning</span>
            <span className="skill-tag">Data Quality</span>
          </div>

          <div className="button-row">
            <a
              href="https://dq-ai.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              Open App
            </a>
            <a
              href="https://github.com/Shanlw440/dq_ai"
              target="_blank"
              rel="noopener noreferrer"
              className="project-link project-link--secondary"
            >
              View Code
            </a>
          </div>
        </div>

        {/* Live embed */}
        <div className="project-gallery">
          <div className="embed-wrapper">
            <iframe
              className="gallery-iframe"
              src="https://dq-ai.onrender.com/"
              title="DQ-AI — Data Quality Auditor"
              loading="lazy"
              allow="clipboard-write"
            />
          </div>
        </div>
      </div>

      {/* ---------- Logistics Performance Dashboard ---------- */}
      <div className="project-card">
        <div className="project-info">
          <h3 className="project-title">Logistics Performance Dashboard</h3>
          <p className="project-description">
            An advanced logistics dashboard featuring a Python-powered recommendation tool. This project analyses
            historical shipment data to provide data-driven recommendations for the most efficient carrier on any given route.
          </p>
          <div className="project-skills">
            <span className="skill-tag">Power BI</span>
            <span className="skill-tag">Python</span>
            <span className="skill-tag">DAX</span>
            <span className="skill-tag">Advanced Analytics</span>
          </div>
        </div>
        <div className="project-gallery">
          <img src="/projects/logistics-1.png" alt="Logistics Dashboard Main" className="gallery-image" />
          <img src="/projects/logistics-2.png" alt="Logistics Dashboard Details" className="gallery-image" />
        </div>
      </div>

      {/* ---------- Automated Sales Report Generator ---------- */}
      <div className="project-card">
        <div className="project-info">
          <h3 className="project-title">Automated Sales Report Generator</h3>
          <p className="project-description">
            A Python script that automates the analysis workflow: load raw sales data, clean it, generate visuals,
            build a SARIMA forecast, and export a multi-page PDF report.
          </p>
          <div className="project-skills">
            <span className="skill-tag">Python</span>
            <span className="skill-tag">Pandas</span>
            <span className="skill-tag">Matplotlib</span>
            <span className="skill-tag">Statsmodels</span>
            <span className="skill-tag">Automation</span>
          </div>
          <a
            href="https://github.com/Shanlw440/Python-pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            View on GitHub
          </a>
        </div>
        <div className="project-gallery">
          <img src="/projects/python-1.png" alt="PDF Report Page 1" className="gallery-image" />
          <img src="/projects/python-2.png" alt="PDF Report Page 2" className="gallery-image" />
          <img src="/projects/python-3.png" alt="PDF Report Page 3" className="gallery-image" />
        </div>
      </div>

      {/* ---------- SQL Customer Churn Analysis ---------- */}
      <div className="project-card">
        <div className="project-info">
          <h3 className="project-title">SQL Customer Churn Analysis</h3>
          <p className="project-description">
            A deep-dive into a telecom database to investigate the drivers of churn. Segments customers and flags
            high-risk profiles by contract type, services, and tenure.
          </p>
          <div className="project-skills">
            <span className="skill-tag">SQL</span>
            <span className="skill-tag">SQLite</span>
            <span className="skill-tag">Business Analysis</span>
          </div>
          <a
            href="https://github.com/Shanlw440/sql-telecom-churn-analysis"
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            View on GitHub
          </a>
        </div>
        <div className="project-gallery">
          <img src="/projects/sql-1.png" alt="SQL Query Examples" className="gallery-image" />
          <img src="/projects/sql-2.png" alt="SQL Query Results" className="gallery-image" />
        </div>
      </div>

      {/* ---------- Coffee Shop Sales Analysis ---------- */}
      <div className="project-card">
        <div className="project-info">
          <h3 className="project-title">Coffee Shop Sales Analysis</h3>
          <p className="project-description">
            A multi-page Power BI dashboard: KPI summary, product performance, and peak-hour behaviour insights.
          </p>
          <div className="project-skills">
            <span className="skill-tag">Power BI</span>
            <span className="skill-tag">DAX</span>
            <span className="skill-tag">Power Query</span>
            <span className="skill-tag">Dashboard Design</span>
          </div>
        </div>
        <div className="project-gallery">
          <img src="/projects/powerbi-1.png" alt="Coffee Shop Dashboard View 1" className="gallery-image" />
          <img src="/projects/powerbi-2.png" alt="Coffee Shop Dashboard View 2" className="gallery-image" />
          <img src="/projects/powerbi-3.png" alt="Coffee Shop Dashboard View 3" className="gallery-image" />
        </div>
      </div>
    </section>
  );
}

export default Projects;
