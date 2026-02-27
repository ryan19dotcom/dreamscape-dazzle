import { motion } from "framer-motion";
import { CONFIG } from "@/config/romantic";

interface Props {
  onNext: () => void;
}

export default function BirthdayScene({ onNext }: Props) {
  return (
    <motion.div
      className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="glass glow-box rounded-2xl p-8 md:p-12 max-w-md w-full text-center"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <h2 className="font-cursive text-5xl md:text-6xl glow-text text-foreground mb-6">
          {CONFIG.birthdayHeading}
        </h2>
        <p className="text-foreground/80 leading-relaxed text-sm md:text-base mb-8">
          {CONFIG.birthdayMessage}
        </p>
        <motion.button
          onClick={onNext}
          className="rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground glow-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          There's more 💌
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
