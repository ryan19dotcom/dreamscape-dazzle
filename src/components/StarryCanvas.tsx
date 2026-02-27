import { Canvas } from "@react-three/fiber";
import { Stars, Sparkles } from "@react-three/drei";
import { useMemo } from "react";

function StarScene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <Stars radius={100} depth={80} count={3000} factor={4} saturation={0.8} fade speed={0.5} />
      <Sparkles count={80} scale={15} size={2} speed={0.3} color="#c084fc" />
      <Sparkles count={40} scale={12} size={3} speed={0.2} color="#f472b6" />
    </>
  );
}

export default function StarryCanvas() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <StarScene />
      </Canvas>
    </div>
  );
}
