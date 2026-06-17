"use client";

import { useCallback, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, CameraControls, useProgress } from "@react-three/drei";
import Model from "./model-404";

function LoadReporter({ onLoad }: { onLoad: () => void }) {
  const { active } = useProgress();

  useEffect(() => {
    if (!active) onLoad();
  }, [active, onLoad]);

  return null;
}

export default function Scene404({ onLoad }: { onLoad?: () => void }) {
  const [key, setKey] = useState(0);

  const handleCreated = useCallback((state: { gl: { domElement: HTMLCanvasElement } }) => {
    const canvas = state.gl.domElement;
    const onContextLost = (e: Event) => {
      e.preventDefault();
      setKey((k) => k + 1);
    };
    const onContextRestored = () => {
      setKey((k) => k + 1);
    };
    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", onContextRestored);
    return () => {
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
    };
  }, []);

  return (
    <Canvas
      key={key}
      orthographic
      camera={{ position: [0, 0, 1], zoom: 800 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
        failIfMajorPerformanceCaveat: false,
      }}
      onCreated={handleCreated}
      style={{ background: "#000" }}
    >
      {onLoad && <LoadReporter onLoad={onLoad} />}
      <ambientLight intensity={2} />
      <directionalLight intensity={4} position={[0, 0.1, 1]} />
      <Model />
      <CameraControls />
      <Environment preset="city" />
    </Canvas>
  );
}
