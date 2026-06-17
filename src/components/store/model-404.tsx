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
      {scene.children.map((mesh, i) => (
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
        <meshPhysicalMaterial
          color={index % 2 === 0 ? "#ffffff" : "#e8e8e8"}
          metalness={0}
          roughness={0}
          envMapIntensity={1.5}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
}

function TextContent() {
  return (
    <group>
      <Text
        font="/fonts/Poppins-Bold.ttf"
        position={[0, 0, -0.1]}
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        404
      </Text>
    </group>
  );
}
