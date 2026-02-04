import React from "react";
import { projects } from "../data";
import { Folder, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const Projects: React.FC = () => {
  return (
    <div className="h-full">
      <h2 className="text-xl font-bold text-brand-neon mb-6 flex items-center gap-2">
        <Folder className="animate-pulse" /> MISSION_LOG
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pr-2">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-black/40 border border-brand-blue/30 hover:border-brand-neon/60 rounded-lg p-5 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,157,0.1)] hover:-translate-y-1"
          >
            {/* Corner Accents */}
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-neon opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-neon opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div className="flex justify-between items-start mb-3">
              <span className="text-xs font-mono text-brand-blue px-2 py-0.5 rounded bg-brand-blue/10 border border-brand-blue/20">
                {project.type}
              </span>
              <span className="text-xs text-gray-600 font-mono">
                ID: 00{project.id}
              </span>
            </div>

            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-neon transition-colors">
              {project.title}
            </h3>

            <p className="text-sm text-gray-400 mb-4 h-12 overflow-hidden">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-[10px] uppercase font-bold text-gray-500 bg-white/5 px-2 py-1 rounded"
                >
                  {t}
                </span>
              ))}
            </div>

            <a
              href={project.link}
              className="mt-auto flex items-center justify-center gap-2 w-full py-2 bg-brand-neon/10 text-brand-neon hover:bg-brand-neon hover:text-black font-bold text-sm rounded transition-all"
            >
              <ExternalLink size={14} /> INITIALIZE
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
