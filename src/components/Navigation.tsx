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
    <nav className="mt-6 flex justify-center">
      <div className="flex gap-4 bg-brand-dark/80 p-2 rounded-xl border border-brand-neon/30">
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
                relative flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300
                ${
                  isActive
                    ? "bg-brand-neon/20 text-brand-neon shadow-[0_0_15px_rgba(0,255,157,0.3)] border border-brand-neon/50"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }
              `}
            >
              <Icon size={18} />
              <span className="font-bold tracking-wider text-sm">
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
