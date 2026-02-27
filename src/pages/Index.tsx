import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import StarryCanvas from "@/components/StarryCanvas";
import FallingPetals from "@/components/FallingPetals";
import IntroScene from "@/components/scenes/IntroScene";
import PasswordScene from "@/components/scenes/PasswordScene";
import TicTacToeScene from "@/components/scenes/TicTacToeScene";
import BirthdayScene from "@/components/scenes/BirthdayScene";
import ExtraScene from "@/components/scenes/ExtraScene";
import LoveScene from "@/components/scenes/LoveScene";
import FinalScene from "@/components/scenes/FinalScene";

const SCENES = [
  IntroScene,
  PasswordScene,
  TicTacToeScene,
  BirthdayScene,
  ExtraScene,
  LoveScene,
  FinalScene,
] as const;

export default function Index() {
  const [scene, setScene] = useState(0);

  const goNext = useCallback(() => {
    setScene((s) => Math.min(s + 1, SCENES.length - 1));
  }, []);

  const CurrentScene = SCENES[scene];

  return (
    <div className="relative min-h-screen overflow-y-auto overflow-x-hidden bg-background">
      <StarryCanvas />
      <FallingPetals />
      <AnimatePresence mode="wait">
        <CurrentScene key={scene} onNext={goNext} />
      </AnimatePresence>
    </div>
  );
}
