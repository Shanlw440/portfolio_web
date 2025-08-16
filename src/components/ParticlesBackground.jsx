// src/components/ParticlesBackground.jsx

import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    // This loads the tsparticles package bundle
    await loadFull(engine);
  }, []);

  // This is the configuration for the particles' behavior
  const particleOptions = {
    background: {
      color: {
        value: "#000000",
      },
    },
    fpsLimit: 60,
    particles: {
      color: {
        value: "#ffffff",
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "out",
        },
        random: true, // Set to true for more natural movement
        speed: 0.1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 150,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 2.5 },
      },
    },
    detectRetina: true,
  };

  // This is the styling for the canvas element itself
  const style = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 0, // Sits behind all other content
  };

  return <Particles id="tsparticles" init={particlesInit} options={particleOptions} style={style} />;
}

export default ParticlesBackground;