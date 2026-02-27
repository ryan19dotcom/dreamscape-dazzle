import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Music, Pause, Play } from "lucide-react";
import { CONFIG } from "@/config/romantic";

interface Props {
  onNext: () => void;
}

export default function LoveScene({ onNext }: Props) {
  const [playing, setPlaying] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleSong = (index: number) => {
    if (playing === index) {
      audioRef.current?.pause();
      setPlaying(null);
      return;
    }
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const audio = new Audio(CONFIG.songs[index].src);
    audio.play().catch(() => {});
    audio.addEventListener("ended", () => setPlaying(null));
    audioRef.current = audio;
    setPlaying(index);
  };

  useEffect(() => {
    return () => { audioRef.current?.pause(); };
  }, []);

  return (
    <motion.div
      className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.h2
        className="font-cursive text-6xl md:text-8xl glow-text text-foreground mb-10"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 1, type: "spring" }}
      >
        I LOVE YOU ❤️
      </motion.h2>

      <motion.div
        className="glass glow-box rounded-2xl p-6 max-w-sm w-full"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <div className="flex items-center gap-2 mb-4 text-muted-foreground">
          <Music className="h-4 w-4" />
          <span className="text-xs uppercase tracking-widest">Our Playlist</span>
        </div>

        <div className="space-y-2">
          {CONFIG.songs.map((song, i) => (
            <motion.button
              key={i}
              onClick={() => toggleSong(i)}
              className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition-colors ${
                playing === i
                  ? "bg-primary/20 text-foreground glow-box"
                  : "hover:bg-muted/50 text-foreground/70"
              }`}
              whileTap={{ scale: 0.97 }}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20">
                {playing === i ? (
                  <Pause className="h-3.5 w-3.5 text-primary" />
                ) : (
                  <Play className="h-3.5 w-3.5 text-primary" />
                )}
              </span>
              <span className="truncate">{song.title}</span>
              {playing === i && (
                <motion.span
                  className="ml-auto text-xs text-primary"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ♪♪
                </motion.span>
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <motion.button
        onClick={onNext}
        className="mt-8 rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground glow-btn"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Turn Page 📖
      </motion.button>
    </motion.div>
  );
}
