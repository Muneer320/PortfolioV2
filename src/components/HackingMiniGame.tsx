import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSound } from "../context/SoundContext";

interface HackingMiniGameProps {
  onClose: () => void;
}

const HackingMiniGame: React.FC<HackingMiniGameProps> = ({ onClose }) => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [level, setLevel] = useState(0);
  const [gameState, setGameState] = useState<
    "idle" | "showing" | "playing" | "gameover" | "won"
  >("idle");
  const { playClick, playSwitch } = useSound();

  const GRID_SIZE = 9; // 3x3 grid

  // Start Game
  useEffect(() => {
    if (gameState === "idle") {
      startNewLevel();
    }
  }, []);

  const startNewLevel = () => {
    setGameState("showing");
    setUserSequence([]);
    const nextNum = Math.floor(Math.random() * GRID_SIZE);

    // Append to sequence to make it harder, or just new random sequence
    // Let's do cumulative sequence (Simon Says style)
    setSequence((prev) => [...prev, nextNum]);
    setLevel((prev) => prev + 1);
  };

  // Show Sequence
  useEffect(() => {
    if (gameState === "showing" && sequence.length > 0) {
      let i = 0;
      const interval = setInterval(() => {
        if (i >= sequence.length) {
          clearInterval(interval);
          setGameState("playing");
          return;
        }

        // Highlight logic handled by state? No, easier to trigger specific visual events
        // We'll use a temporary state or just direct DOM/animation control?
        // Let's use a "highlightedIndex" state
        setHighlightedIndex(sequence[i]);
        playSwitch(); // Sound for showing

        setTimeout(() => {
          setHighlightedIndex(null);
        }, 400); // Highlight duration

        i++;
      }, 800); // Gap between flashes

      return () => clearInterval(interval);
    }
  }, [gameState, sequence]);

  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const handlePadClick = (index: number) => {
    if (gameState !== "playing") return;

    playClick();

    // Visual feedback for user click
    setHighlightedIndex(index);
    setTimeout(() => setHighlightedIndex(null), 200);

    const match = sequence[userSequence.length] === index;

    if (!match) {
      setGameState("gameover");
      return;
    }

    const newUserSeq = [...userSequence, index];
    setUserSequence(newUserSeq);

    if (newUserSeq.length === sequence.length) {
      if (level >= 5) {
        // Win Condition
        setGameState("won");
      } else {
        setTimeout(startNewLevel, 1000);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[110] bg-black/95 flex items-center justify-center p-4">
      <div className="bg-brand-dark border-2 border-brand-neon p-8 rounded-xl max-w-md w-full shadow-[0_0_50px_rgba(0,255,157,0.2)]">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-brand-neon mb-2">
            SECURITY_OVERRIDE_SEQUENCE
          </h2>
          <div className="text-sm font-mono text-gray-400">
            {gameState === "idle" && "INITIALIZING..."}
            {gameState === "showing" && "OBSERVE PATTERN..."}
            {gameState === "playing" && "REPEAT PATTERN..."}
            {gameState === "gameover" && (
              <span className="text-red-500">
                ACCESS DENIED - SEQUENCE FAILED
              </span>
            )}
            {gameState === "won" && (
              <span className="text-brand-blue">
                ACCESS GRANTED - SYSTEM UNLOCKED
              </span>
            )}
          </div>
          <div className="mt-2 text-xs text-brand-neon/50">LEVEL {level}/5</div>
        </div>

        {gameState === "won" ? (
          <div className="text-center py-10 animate-pulse">
            <h3 className="text-3xl text-brand-neon mb-4">You're Hired!</h3>
            <p className="text-gray-300 mb-6 font-mono">
              Secret Code: "DEV_GOD_MODE"
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-brand-neon text-black font-bold rounded hover:bg-white"
            >
              RETURN TO DASHBOARD
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {Array.from({ length: GRID_SIZE }).map((_, i) => (
                <motion.button
                  key={i}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handlePadClick(i)}
                  className={`
                    aspect-square rounded border-2 transition-all duration-200
                    ${
                      highlightedIndex === i
                        ? "bg-brand-neon border-white shadow-[0_0_30px_#00ff9d]"
                        : "bg-black/50 border-brand-neon/30 hover:border-brand-neon/60"
                    }
                    ${gameState === "gameover" ? "border-red-500/50 bg-red-900/10" : ""}
                  `}
                />
              ))}
            </div>

            <div className="flex justify-center">
              {gameState === "gameover" ? (
                <button
                  onClick={() => {
                    setLevel(0);
                    setSequence([]);
                    setGameState("idle");
                    startNewLevel();
                  }}
                  className="px-6 py-2 bg-red-500 text-black font-bold rounded hover:bg-red-400"
                >
                  RETRY SEQUENCE
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-white text-sm"
                >
                  ABORT HACK
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HackingMiniGame;
