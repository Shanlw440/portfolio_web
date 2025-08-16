// src/components/ContactMe.jsx

import React from "react";

function ContactMe() {
  return (
    <section
      style={{
        padding: "0 2rem 4rem",
        textAlign: "center",
        backgroundColor: "transparent",
        position: "relative",
        zIndex: 2,
        marginTop: "-15rem", // The fix: This pulls the button up
      }}
    >
      <a
        href="mailto:s.wise11@hotmail.co.uk"
        style={{
          color: "#f06ca4",
          border: "2px solid #f06ca4",
          padding: "0.75rem 1.5rem",
          borderRadius: "6px",
          fontWeight: "bold",
          fontSize: "1rem",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          textDecoration: "none",
          backgroundColor: "transparent",
          cursor: "pointer",
          transition: "background-color 0.3s, color 0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#f06ca4";
          e.currentTarget.style.color = "black";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "#f06ca4";
        }}
        aria-label="Get in touch"
      >
        Get in touch{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          style={{ width: 20, height: 20 }}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
          />
        </svg>
      </a>
    </section>
  );
}

export default ContactMe;