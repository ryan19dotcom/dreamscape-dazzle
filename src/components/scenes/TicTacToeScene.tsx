import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";

interface Props {
  onNext: () => void;
}

type Cell = "💖" | "✕" | null;

function checkWinner(board: Cell[]): Cell | "draw" | null {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  if (board.every(Boolean)) return "draw";
  return null;
}

export default function TicTacToeScene({ onNext }: Props) {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [gameOver, setGameOver] = useState(false);
  const [result, setResult] = useState<string>("");
  const [dissolving, setDissolving] = useState(false);

  const aiMove = useCallback((b: Cell[]) => {
    const empty = b.map((c, i) => (c === null ? i : -1)).filter((i) => i !== -1);
    if (empty.length === 0) return;
    const pick = empty[Math.floor(Math.random() * empty.length)];
    const next = [...b];
    next[pick] = "✕";
    setBoard(next);
    const w = checkWinner(next);
    if (w) endGame(w);
  }, []);

  const endGame = (w: Cell | "draw") => {
    setGameOver(true);
    if (w === "💖") setResult("You won! 🎉");
    else if (w === "✕") setResult("Nice try! 💜");
    else setResult("It's a draw! ✨");
    setTimeout(() => {
      setDissolving(true);
      setTimeout(onNext, 1200);
    }, 2000);
  };

  const handleTap = (i: number) => {
    if (board[i] || gameOver) return;
    const next = [...board];
    next[i] = "💖";
    setBoard(next);
    const w = checkWinner(next);
    if (w) { endGame(w); return; }
    setTimeout(() => aiMove(next), 400);
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
        animate={dissolving ? { scale: 0, opacity: 0, rotate: 180 } : {}}
        transition={{ duration: 1 }}
      >
        <h2 className="mb-2 font-cursive text-3xl md:text-4xl glow-text text-foreground text-center">
          A Little Game 💖
        </h2>
        <p className="mb-6 text-sm text-muted-foreground text-center">Tap to place your heart</p>

        <div className="grid grid-cols-3 gap-2">
          {board.map((cell, i) => (
            <motion.button
              key={i}
              onClick={() => handleTap(i)}
              className="h-20 w-20 md:h-24 md:w-24 rounded-lg glass flex items-center justify-center text-3xl md:text-4xl"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
            >
              <AnimatePresence>
                {cell && (
                  <motion.span
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {cell}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>

        {result && (
          <motion.p
            className="mt-6 text-center text-xl text-foreground glow-text"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {result}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
}
