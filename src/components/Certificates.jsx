// src/components/Certificates.jsx

import React from "react";
import "./Certificates.css";

// Updated filenames
const certificates = [
  { name: "Essential Statistics", file: "Essential_Statistics.pdf", thumbnail: "stats.png" },
  { name: "Excel (CodeCademy)", file: "Excel_CodeCademy.png", thumbnail: "excel.png" },
  { name: "Excel (General)", file: "Excel.pdf", thumbnail: "excel.png" },
  { name: "Power BI", file: "Powerbi.pdf", thumbnail: "powerbi.png" },
  { name: "Python Essentials", file: "Python_Essentials.pdf", thumbnail: "python.png" },
  { name: "Python for Data Analysis", file: "Python_for_Data_Analysis.pdf", thumbnail: "pythonda.png" },
  { name: "SQL", file: "SQL.png", thumbnail: "sql1.png" }, // updated!
  { name: "Tableau", file: "Tableau.pdf", thumbnail: "tableau.png" },
];

function Certificates() {
  return (
    <section id="certificates" className="certificates-section" style={{ zIndex: 2, position: "relative" }}>
      <h2>Certificates</h2>
      <div className="cert-grid">
        {certificates.map((cert, index) => (
          <a
            key={index}
            href={`/certificates/${cert.file}`}
            target="_blank"
            rel="noopener noreferrer"
            className="cert-card"
          >
            <div className="cert-thumb">
              <img src={`/certificates/${cert.thumbnail}`} alt={cert.name} />
            </div>
            <span>{cert.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

export default Certificates;
