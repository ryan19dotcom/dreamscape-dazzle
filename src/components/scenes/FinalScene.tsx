import { motion } from "framer-motion";
import { CONFIG } from "@/config/romantic";

export default function FinalScene() {
  return (
    <motion.div
      className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <motion.div
        className="glass glow-box rounded-2xl p-8 md:p-12 max-w-lg w-full"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        <motion.h2
          className="font-cursive text-3xl md:text-4xl glow-text text-foreground mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Now I wanna share some serious things with you, read carefully
        </motion.h2>

        <div className="space-y-5">
          {CONFIG.finalParagraphs.map((para, i) => (
            <motion.p
              key={i}
              className="text-foreground/80 leading-relaxed text-sm md:text-base"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.4, duration: 0.6 }}
            >
              {para}
            </motion.p>
          ))}
        </div>

        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 + CONFIG.finalParagraphs.length * 0.4 + 0.5 }}
        >
          <span className="text-4xl">💜</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
