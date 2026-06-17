"use client";

import { useCallback, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Model from "./model-404";

export default function Scene404() {
  const [key, setKey] = useState(0);

  const handleCreated = useCallback((state: { gl: { domElement: HTMLCanvasElement } }) => {
    const canvas = state.gl.domElement;
    const onContextLost = (e: Event) => {
      e.preventDefault();
      setKey((k) => k + 1);
    };
    canvas.addEventListener("webglcontextlost", onContextLost);
    return () => canvas.removeEventListener("webglcontextlost", onContextLost);
  }, []);

  return (
    <Canvas
      key={key}
      orthographic
      camera={{ position: [0, 0, 1], zoom: 800 }}
      dpr={[1, 1.2]}
      gl={{
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
        failIfMajorPerformanceCaveat: false,
      }}
      onCreated={handleCreated}
      style={{ background: "#000" }}
    >
      <ambientLight intensity={2} />
      <directionalLight intensity={4} position={[0, 0.1, 1]} />
      <Model />
    </Canvas>
  );
}
