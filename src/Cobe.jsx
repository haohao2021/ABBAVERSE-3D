import React, { useEffect, useRef, useState } from "react";
import { useSpring, animated } from "react-spring";
import createGlobe from "cobe";

const Cobe = ({ markers }) => {
  const canvasRef = useRef(null);
  const globeRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [startPhiTheta, setStartPhiTheta] = useState({ phi: 0, theta: 0 });

  const [{ phi, theta }, api] = useSpring(() => ({
    phi: 0,
    theta: 0,
    config: { mass: 1, tension: 280, friction: 40, precision: 0.001 },
  }));

  useEffect(() => {
    // console.log(canvasRef.current);
    if (canvasRef.current && !globeRef.current) {
      const handleGlobeInit = () => {

        console.log(canvasRef.current.clientWidth);
        console.log(canvasRef.current.clientHeight); 

        globeRef.current = createGlobe(canvasRef.current, {
          devicePixelRatio: window.devicePixelRatio || 1,
          width: canvasRef.current.clientWidth,
          height: canvasRef.current.clientHeight,
          markers,

          phi: 0, 
          theta: 0, 
          dark: 0.5, 
          diffuse: 1.0, 
          mapSamples: 10000, 
          mapBrightness: 1.0, 
          baseColor: [1, 1, 1],
          markerColor: [1, 1, 1],
          glowColor: [1, 1, 1],

          onRender: (state) => {
            api.start({
              phi: state.phi,
              theta: state.theta,
            });
          },
        });

        canvasRef.current.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
      };

      handleGlobeInit();
    }

    return () => {
      if (globeRef.current) {
        globeRef.current.destroy();
      }
    };
  }, [markers, api]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPosition({ x: e.clientX, y: e.clientY });
    if (globeRef.current) {
      setStartPhiTheta({
        phi: globeRef.current.phi,
        theta: globeRef.current.theta,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && globeRef.current) {
      const dx = e.clientX - startPosition.x;
      const dy = e.clientY - startPosition.y;

      globeRef.current.phi = startPhiTheta.phi + dx * 0.01;
      globeRef.current.theta = startPhiTheta.theta + dy * 0.01;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 600,
        aspectRatio: "1",
        margin: "auto",
        position: "relative",
      }}
    >
      <animated.canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", cursor: "grab" }}
      />

      {/* <canvas ref={canvasRef}></canvas> */}
    </div>
  );
};

export default Cobe;
