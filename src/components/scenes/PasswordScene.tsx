import { motion } from "framer-motion";
import { useState } from "react";
import { Heart, Lock } from "lucide-react";
import { CONFIG } from "@/config/romantic";

interface Props {
  onNext: () => void;
}

export default function PasswordScene({ onNext }: Props) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.toLowerCase().trim() === CONFIG.password.toLowerCase()) {
      setUnlocked(true);
      setTimeout(onNext, 1500);
    } else {
      setError(true);
      setTimeout(() => setError(false), 600);
    }
  };

  return (
    <motion.div
      className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="flex flex-col items-center"
        animate={unlocked ? { scale: [1, 1.3, 0], opacity: [1, 1, 0] } : {}}
        transition={{ duration: 1.2 }}
      >
        <motion.div
          className="mb-8 text-accent"
          animate={
            error
              ? { x: [-10, 10, -10, 10, 0] }
              : { scale: [1, 1.05, 1] }
          }
          transition={error ? { duration: 0.4 } : { duration: 2, repeat: Infinity }}
        >
          {unlocked ? (
            <Heart className="h-20 w-20 fill-accent" />
          ) : (
            <Lock className="h-20 w-20" />
          )}
        </motion.div>

        <p className="mb-6 text-center text-muted-foreground">
          Enter the secret password to unlock 💜
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
          <input
            type="password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type the password..."
            className="w-64 rounded-full glass px-6 py-3 text-center text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
            autoFocus
          />
          <motion.button
            type="submit"
            className="rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground glow-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Unlock 💖
          </motion.button>
        </form>

        {error && (
          <motion.p
            className="mt-4 text-sm text-secondary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Wrong password, try again 💜
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
}
