import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Volume2, VolumeX } from "lucide-react";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import Projects from "./components/Projects";
import About from "./components/About";
import Contact from "./components/Contact";
import SecretTerminal from "./components/SecretTerminal";
import HackingMiniGame from "./components/HackingMiniGame";
import { SoundProvider, useSound } from "./context/SoundContext";

const SoundToggle = () => {
  const { isPlaying, toggleSound } = useSound();
  return (
    <button
      onClick={toggleSound}
      className="p-2 text-brand-neon border border-brand-neon/30 rounded hover:bg-brand-neon hover:text-black transition-colors"
      title={isPlaying ? "Mute System Audio" : "Enable System Audio"}
    >
      {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
    </button>
  );
};

const RenderView = ({ currentView }: { currentView: string }) => {
  switch (currentView) {
    case "dashboard":
      return <Dashboard />;
    case "projects":
      return <Projects />;
    case "about":
      return <About />;
    case "contact":
      return <Contact />;
    default:
      return <Dashboard />;
  }
};

function MainLayout() {
  const [currentView, setCurrentView] = useState("dashboard");
  const [showTerminal, setShowTerminal] = useState(false);
  const [showGame, setShowGame] = useState(false);

  // Konami Code State
  const [konamiIndex, setKonamiIndex] = useState(0);
  const KONAMI_CODE = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle Terminal on Backtick/Tilde
      if (e.key === "`" || e.key === "~") {
        setShowTerminal((prev) => !prev);
      }

      // Konami Code Logic
      if (e.key === KONAMI_CODE[konamiIndex]) {
        const nextIndex = konamiIndex + 1;
        if (nextIndex === KONAMI_CODE.length) {
          // Code Activated
          setShowGame(true);
          setKonamiIndex(0);
        } else {
          setKonamiIndex(nextIndex);
        }
      } else {
        setKonamiIndex(0); // Reset if mistake
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [konamiIndex]);

  return (
    <div className="min-h-screen bg-brand-dark text-white font-mono overflow-hidden relative selection:bg-brand-neon selection:text-black">
      {/* Background Grid Effect */}
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 255, 157, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 157, 0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      {/* CRT Scanline Effect */}
      <div className="absolute inset-0 z-50 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-20"></div>

      {/* Secret Overlays */}
      <SecretTerminal
        isOpen={showTerminal}
        onClose={() => setShowTerminal(false)}
        onGameStart={() => setShowGame(true)}
      />

      {showGame && <HackingMiniGame onClose={() => setShowGame(false)} />}

      <main className="relative z-10 p-4 md:p-6 h-screen flex flex-col max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-6 border-b border-brand-neon/30 pb-4 shrink-0">
          <div className="flex items-center gap-2">
            <Cpu className="text-brand-neon animate-pulse" />
            <h1 className="text-xl md:text-2xl font-bold tracking-widest text-glow">
              MUNEER<span className="text-brand-neon">.EXE</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-xs text-brand-neon/70 font-mono">
              SYS.STATUS: ONLINE | LOC: BLR | v2.0.1
            </div>
            <SoundToggle />
          </div>
        </header>

        <section className="flex-1 overflow-hidden relative border border-brand-neon/20 bg-black/40 backdrop-blur-sm rounded-lg p-4 md:p-6 box-glow shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
              transition={{ duration: 0.3 }}
              className="h-full overflow-y-auto custom-scrollbar"
            >
              <RenderView currentView={currentView} />
            </motion.div>
          </AnimatePresence>
        </section>

        <Navigation currentView={currentView} setView={setCurrentView} />
      </main>
    </div>
  );
}

function App() {
  return (
    <SoundProvider>
      <MainLayout />
    </SoundProvider>
  );
}

export default App;
