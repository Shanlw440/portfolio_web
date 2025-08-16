// src/App.jsx

import React from "react";
import Navbar from "./components/Navbar";
import ParticlesBackground from "./components/ParticlesBackground";
import Hero from "./components/Hero";
import AboutMe from "./components/AboutMe";
import Projects from "./components/Projects";
import Footer from "./components/footer"; 
import Certificates from "./components/Certificates";


function App() {
  return (
    <div>
      <Navbar />
      <main>
        <div id="home" style={{ position: "relative" }}>
          <ParticlesBackground />
          <Hero />
          {/* The old ContactMe button is no longer needed */}
          <AboutMe />
          <Projects />
          <Certificates /> 
        </div>
      </main>
      <Footer /> {/* 2. Add the component here */}
    </div>
  );
}

export default App;
