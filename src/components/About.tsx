import React from "react";
import { skills } from "../data";
import { Cpu, Database, Command } from "lucide-react";
import { motion } from "framer-motion";

const About: React.FC = () => {
  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex items-center gap-4 mb-2">
        <div className="p-3 bg-brand-purple/20 text-brand-purple rounded-lg border border-brand-purple/50">
          <Cpu size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">TECH_STACK_ANALYSIS</h2>
          <p className="text-sm text-gray-400">
            {" "}
            Proficiency & Skill Distribution
          </p>
        </div>
      </div>

      <div className="bg-black/40 border border-white/5 rounded-lg p-6 flex-1 overflow-y-auto custom-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-brand-neon font-bold mb-4 flex items-center gap-2 text-sm tracking-widest">
              <Command size={14} /> CORE_COMPETENCIES
            </h3>
            <div className="space-y-4">
              {skills.map((skill, idx) => (
                <motion.div
                  key={skill.name}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="group"
                >
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-300 font-medium group-hover:text-brand-neon transition-colors">
                      {skill.name}
                    </span>
                    <span className="text-xs text-gray-600 font-mono">
                      Lvl {skill.level}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{
                        delay: 0.2 + idx * 0.1,
                        duration: 1,
                        ease: "easeOut",
                      }}
                      className={`h-full ${
                        skill.category === "Frontend"
                          ? "bg-brand-neon"
                          : skill.category === "Backend"
                            ? "bg-brand-blue"
                            : skill.category === "AI"
                              ? "bg-brand-purple"
                              : "bg-white"
                      }`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-brand-blue font-bold mb-4 flex items-center gap-2 text-sm tracking-widest">
              <Database size={14} /> EXPERIENCE_LOG
            </h3>

            <div className="relative border-l border-brand-blue/20 ml-3 pl-6 space-y-8">
              <div className="relative">
                <span className="absolute -left-[29px] top-1 h-3 w-3 rounded-full bg-brand-blue box-glow"></span>
                <div className="text-xs text-brand-blue mb-1 font-mono">
                  2023 - PRESENT
                </div>
                <h4 className="text-white font-bold">
                  Scaler School of Technology
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  Pursuing Computer Science degree. Mastering the art of
                  full-stack engineering and building real-world projects.
                </p>
              </div>

              <div className="relative">
                <span className="absolute -left-[29px] top-1 h-3 w-3 rounded-full bg-brand-purple box-glow"></span>
                <div className="text-xs text-brand-purple mb-1 font-mono">
                  FOUNDING
                </div>
                <h4 className="text-white font-bold">Parapixel DigiServices</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Co-Founder & Tech Lead. Scaling digital solutions for clients
                  across the globe.
                </p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-brand-neon/5 border border-brand-neon/20 rounded">
              <p className="text-xs text-brand-neon font-mono mb-2">
                {">"} SYSTEM_NOTE:
              </p>
              <p className="text-sm text-gray-400 italic">
                "Always learning, always building. Open to collaborations on AI
                and Web Dev projects."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
