import { useMemo } from "react";

export default function FallingPetals() {
  const petals = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 15,
        duration: 10 + Math.random() * 10,
        size: 8 + Math.random() * 12,
      })),
    []
  );

  return (
    <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden">
      {petals.map((p) => (
        <span
          key={p.id}
          className="absolute text-accent opacity-0"
          style={{
            left: `${p.left}%`,
            fontSize: p.size,
            animation: `petal-fall ${p.duration}s ${p.delay}s ease-in infinite`,
          }}
        >
          🌸
        </span>
      ))}
    </div>
  );
}
