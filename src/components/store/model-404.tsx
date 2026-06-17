"use client";

import { useGLTF, Text, Float } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import type { Mesh } from "three";

export default function Model() {
  const { viewport } = useThree();
  const { nodes } = useGLTF("/shards.glb");

  const scene = nodes.Scene as unknown as { children: Mesh[] };

  return (
    <group scale={viewport.width / 1.5}>
      {scene.children.slice(0, 4).map((mesh, i) => (
        <Shard key={i} data={mesh} index={i} />
      ))}
      <TextContent />
    </group>
  );
}

function Shard({ data, index }: { data: Mesh; index: number }) {
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
      <mesh {...data}>
        <meshStandardMaterial
          color={index % 2 === 0 ? "#ffffff" : "#e0e0e0"}
          metalness={0.3}
          roughness={0.2}
          envMapIntensity={1}
        />
      </mesh>
    </Float>
  );
}

function TextContent() {
  return (
    <group>
      <Text
        position={[0, 0, -0.1]}
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        404
      </Text>
      <Text
        position={[0, -0.15, -0.1]}
        fontSize={0.03}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Page not found
      </Text>
    </group>
  );
}
