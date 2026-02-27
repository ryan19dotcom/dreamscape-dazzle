import { motion } from "framer-motion";
import { CONFIG } from "@/config/romantic";

interface Props {
  onNext: () => void;
}

export default function ExtraScene({ onNext }: Props) {
  return (
    <motion.div
      className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6"
      initial={{ opacity: 0, rotateY: 90 }}
      animate={{ opacity: 1, rotateY: 0 }}
      exit={{ opacity: 0, rotateY: -90 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="glass glow-box rounded-2xl p-8 md:p-12 max-w-md w-full text-center"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="text-foreground/80 leading-relaxed text-sm md:text-base mb-8">
          {CONFIG.extraMessage}
        </p>
        <motion.button
          onClick={onNext}
          className="rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground glow-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Next ➜
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
