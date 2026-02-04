import React, { createContext, useContext, useState, useEffect } from "react";
import {
  playSound,
  startAmbience,
  stopAmbience,
  initAudio,
} from "../utils/soundEngine";

interface SoundContextType {
  isPlaying: boolean;
  toggleSound: () => void;
  playHover: () => void;
  playClick: () => void;
  playSwitch: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);

  // Manage Engine State based on React State
  useEffect(() => {
    if (isPlaying) {
      startAmbience();
    } else {
      stopAmbience();
    }
  }, [isPlaying]);

  // Handle Browser Autoplay Policy (Resume Context on Interaction)
  useEffect(() => {
    const handleFirstInteraction = () => {
      const ctx = initAudio();
      if (ctx?.state === "suspended") {
        ctx.resume();
      }

      // Clean up listeners once we've attempted to resume
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction);
    window.addEventListener("keydown", handleFirstInteraction);

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };
  }, []);

  const toggleSound = () => {
    console.log("Toggle Sound Clicked. Current:", isPlaying);
    if (!isPlaying) {
      // If enabling, ensure context is ready
      const ctx = initAudio();
      if (ctx?.state === "suspended") ctx.resume();
    }
    setIsPlaying((prev) => !prev);
  };

  const playHover = () => {
    if (isPlaying) playSound("hover");
  };
  const playClick = () => {
    if (isPlaying) playSound("click");
  };
  const playSwitch = () => {
    if (isPlaying) playSound("switch");
  };

  return (
    <SoundContext.Provider
      value={{ isPlaying, toggleSound, playHover, playClick, playSwitch }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return context;
};
