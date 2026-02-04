import React from "react";
import { LayoutDashboard, User, FolderCode, Mail } from "lucide-react";
import { useSound } from "../context/SoundContext";

interface NavigationProps {
  currentView: string;
  setView: (view: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const { playHover, playClick } = useSound();

  const navItems = [
    { id: "dashboard", label: "DASHBOARD", icon: LayoutDashboard },
    { id: "about", label: "PROFILE", icon: User },
    { id: "projects", label: "MISSIONS", icon: FolderCode },
    { id: "contact", label: "COMMS", icon: Mail },
  ];

  return (
    <nav className="mt-6 flex justify-center w-full cursor-none">
      <div className="flex gap-2 md:gap-4 bg-brand-dark/80 p-2 rounded-xl border border-brand-neon/30 w-full md:w-auto justify-between md:justify-center overflow-x-auto cursor-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                playClick();
                setView(item.id);
              }}
              onMouseEnter={playHover}
              className={`
                relative flex items-center justify-center gap-2 px-3 py-2 md:px-6 md:py-3 rounded-lg transition-all duration-300 flex-1 md:flex-none cursor-none
                ${
                  isActive
                    ? "bg-brand-neon/20 text-brand-neon shadow-[0_0_15px_rgba(0,255,157,0.3)] border border-brand-neon/50"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }
              `}
            >
              <Icon size={18} />
              <span className="font-bold tracking-wider text-[10px] md:text-sm hidden sm:inline">
                {item.label}
              </span>
              {isActive && (
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-brand-neon box-glow"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
