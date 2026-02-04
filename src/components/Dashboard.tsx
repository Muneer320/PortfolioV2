import React from "react";
import { profile } from "../data";
import { Shield, Zap, Brain, Crosshair, Terminal } from "lucide-react";

const StatBar: React.FC<{
  label: string;
  value: number;
  icon: any;
  color: string;
}> = ({ label, value, icon: Icon, color }) => (
  <div className="flex items-center gap-4 mb-3 group">
    <div
      className={`p-2 rounded bg-black/50 border border-${color}/30 text-${color}`}
    >
      <Icon size={16} />
    </div>
    <div className="flex-1">
      <div className="flex justify-between mb-1">
        <span className="text-xs font-bold text-gray-400 group-hover:text-white transition-colors">
          {label}
        </span>
        <span className={`text-xs font-mono text-${color}`}>{value}/100</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-1000 ease-out relative"
          style={{
            width: `${value}%`,
            backgroundColor:
              color === "brand-neon"
                ? "#00ff9d"
                : color === "brand-blue"
                  ? "#00d0ff"
                  : "#bd00ff",
          }}
        >
          <div className="absolute top-0 right-0 bottom-0 w-1 bg-white/50 animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 h-full">
      {/* Character Model / Avatar Section */}
      <div className="md:w-1/3 flex flex-col">
        <div className="flex-1 bg-black/30 border border-brand-neon/20 rounded-lg p-4 relative overflow-hidden group">
          <div className="absolute inset-0 bg-brand-neon/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="h-64 md:h-full flex items-center justify-center bg-gradient-to-b from-transparent to-brand-neon/10">
            {/* Placeholder for 3D Model or Avatar Image */}
            <div className="text-brand-neon/20 text-9xl">
              <UserAvatar />
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-2xl font-bold text-white mb-1">
              {profile.name}
            </h2>
            <div className="text-brand-neon/80 text-sm font-mono border-l-2 border-brand-neon pl-2">
              {profile.status}
            </div>
          </div>
        </div>
      </div>

      {/* Stats & Info */}
      <div className="md:w-2/3 flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-black/40 border border-brand-blue/30 p-5 rounded-lg">
            <h3 className="text-brand-blue mb-4 flex items-center gap-2 font-bold tracking-widest text-sm">
              <Terminal size={14} /> SYSTEM_STATS
            </h3>
            <StatBar
              label="CODING_STR"
              value={profile.stats.STR}
              icon={Zap}
              color="brand-blue"
            />
            <StatBar
              label="PROBLEM_SOLVING"
              value={profile.stats.INT}
              icon={Brain}
              color="brand-purple"
            />
            <StatBar
              label="EFFICIENCY"
              value={profile.stats.DEX}
              icon={Crosshair}
              color="brand-neon"
            />
            <StatBar
              label="CAFFEINE_LVL"
              value={profile.stats.VIT}
              icon={Shield}
              color="brand-blue"
            />
          </div>

          <div className="bg-black/40 border border-brand-purple/30 p-5 rounded-lg flex flex-col">
            <h3 className="text-brand-purple mb-4 flex items-center gap-2 font-bold tracking-widest text-sm">
              <Terminal size={14} /> ACTIVE_QUEST
            </h3>
            <div className="flex-1 flex flex-col justify-center">
              <div className="text-sm text-gray-400 mb-2">
                CURRENT OBJECTIVE:
              </div>
              <div className="text-xl text-white font-bold mb-4">
                Building the Future of Digital Services
              </div>
              <div className="text-xs text-gray-500 font-mono">
                {">"} Parapixel DigiServices
                <br />
                {">"} Status: SCALING...
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-black/40 border border-white/10 p-5 rounded-lg">
          <h3 className="text-gray-400 mb-2 text-xs font-bold tracking-widest">
            BIO_LOG
          </h3>
          <p className="text-gray-300 leading-relaxed font-light">
            {profile.bio}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-brand-neon/10 text-brand-neon text-xs rounded border border-brand-neon/20">
              Full Stack
            </span>
            <span className="px-2 py-1 bg-brand-blue/10 text-brand-blue text-xs rounded border border-brand-blue/20">
              AI / ML
            </span>
            <span className="px-2 py-1 bg-brand-purple/10 text-brand-purple text-xs rounded border border-brand-purple/20">
              Creative Dev
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple SVG Avatar Placeholder
const UserAvatar = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-48 h-48 animate-pulse opacity-50"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

export default Dashboard;
