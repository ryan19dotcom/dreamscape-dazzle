import { motion } from "framer-motion";
import { useEffect } from "react";
import { CONFIG } from "@/config/romantic";

interface Props {
  onNext: () => void;
}

export default function IntroScene({ onNext }: Props) {
  useEffect(() => {
    const timer = setTimeout(onNext, 7000);
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <motion.div
      className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.2 }}
      transition={{ duration: 1.2 }}
    >
      <motion.h1
        className="font-cursive text-6xl md:text-8xl glow-text text-foreground"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
      >
        {CONFIG.herName}
      </motion.h1>

      <motion.p
        className="mt-6 text-lg md:text-xl text-muted-foreground tracking-wide"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        {CONFIG.introSubtitle}
      </motion.p>

      <motion.div
        className="mt-12 h-0.5 w-16 rounded-full bg-primary"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      />

      {/* Skip hint */}
      <motion.p
        className="absolute bottom-8 text-xs text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 4, duration: 1 }}
      >
        entering your universe...
      </motion.p>
    </motion.div>
  );
}
