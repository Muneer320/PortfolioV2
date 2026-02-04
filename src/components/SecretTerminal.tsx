import React, { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, X } from "lucide-react";
import { useSound } from "../context/SoundContext";

const COMMANDS: Record<string, string> = {
  help: "AVAILABLE COMMANDS: help, whoami, contact, projects, clear, secret, game",
  whoami: "USER: GUEST | ROLE: VISITOR | ACCESS: LEVEL 1",
  contact: "EMAIL: contact@muneer.dev | TWITTER: @muneer320",
  projects:
    "RUNNING 'ls ./projects' ... \n> PARAPIXEL\n> NEURAL_VISION\n> PORTFOLIO_V2",
  secret: "ACCESS DENIED. TRY 'sudo secret'",
  "sudo secret": "ACCESS GRANTED. THE KONAMI CODE IS THE KEY.",
  game: "LAUNCHING MINI-GAME PROTOCOL...",
};

interface SecretTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onGameStart: () => void;
}

const SecretTerminal: React.FC<SecretTerminalProps> = ({
  isOpen,
  onClose,
  onGameStart,
}) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([
    "> SYSTEM INITIALIZED...",
    '> TYPE "help" FOR COMMANDS',
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { playClick, playSwitch } = useSound();

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    playClick(); // SFX

    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, `> ${input}`];

    if (cmd === "clear") {
      setHistory(["> CONSOLE CLEARED"]);
    } else if (cmd === "game") {
      newHistory.push(COMMANDS[cmd]);
      setHistory(newHistory);
      setTimeout(() => {
        onClose();
        onGameStart();
      }, 1000);
    } else if (COMMANDS[cmd]) {
      newHistory.push(COMMANDS[cmd]);
      setHistory(newHistory);
    } else {
      newHistory.push(`ERROR: COMMAND "${cmd}" NOT RECOGNIZED`);
      setHistory(newHistory);
    }

    setInput("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col font-mono p-4 md:p-10 animate-in fade-in slide-in-from-top-10 duration-300">
      <div className="flex justify-between items-center mb-4 border-b border-green-500/30 pb-2">
        <h2 className="text-green-500 flex items-center gap-2 text-xl font-bold">
          <TerminalIcon /> ROOT_ACCESS_TERMINAL
        </h2>
        <button onClick={onClose} className="text-red-500 hover:text-red-400">
          <X size={24} />
        </button>
      </div>

      <div
        className="flex-1 overflow-y-auto mb-4 space-y-2 custom-scrollbar p-2"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((line, i) => (
          <div key={i} className="text-green-400 whitespace-pre-wrap">
            {line}
          </div>
        ))}
      </div>

      <form onSubmit={handleCommand} className="flex gap-2 items-center">
        <span className="text-green-500 text-xl">{">"}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            playSwitch(); // Typing sounds
          }}
          className="flex-1 bg-transparent border-none outline-none text-green-500 text-xl font-bold caret-green-500"
          autoFocus
          onBlur={() => inputRef.current?.focus()}
        />
      </form>
      <div className="mt-2 text-xs text-green-500/50">
        TIP: PRESS 'ESC' TO CLOSE
      </div>
    </div>
  );
};

export default SecretTerminal;
