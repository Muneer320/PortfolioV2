import React, { useState } from "react";
import { Send, Mail, MapPin, Globe, Loader2 } from "lucide-react";

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">(
    "idle",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    // Simulate network request
    setTimeout(() => {
      setFormState("sent");
      setTimeout(() => setFormState("idle"), 3000);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="text-brand-neon">
            {">"}
            {">"}
          </span>{" "}
          ESTABLISH_UPLINK
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs text-brand-blue font-mono">
              ID / NAME
            </label>
            <input
              type="text"
              required
              className="w-full bg-black/50 border border-gray-700 rounded p-3 text-white focus:border-brand-neon focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,157,0.2)] transition-all font-mono"
              placeholder="ENTER IDENTIFIER"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-brand-blue font-mono">
              FREQUENCY / EMAIL
            </label>
            <input
              type="email"
              required
              className="w-full bg-black/50 border border-gray-700 rounded p-3 text-white focus:border-brand-neon focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,157,0.2)] transition-all font-mono"
              placeholder="ENTER FREQUENCY"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-brand-blue font-mono">
              TRANSMISSION_DATA
            </label>
            <textarea
              rows={4}
              required
              className="w-full bg-black/50 border border-gray-700 rounded p-3 text-white focus:border-brand-neon focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,157,0.2)] transition-all font-mono"
              placeholder="TYPE MESSAGE..."
            />
          </div>

          <button
            type="submit"
            disabled={formState !== "idle"}
            className="w-full bg-brand-neon text-black font-bold py-3 rounded hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formState === "idle" && (
              <>
                <Send size={16} /> SEND TRANSMISSION
              </>
            )}
            {formState === "sending" && (
              <>
                <Loader2 size={16} className="animate-spin" /> ENCRYPTING &
                SENDING...
              </>
            )}
            {formState === "sent" && <>TRANSMISSION SUCCESSFUL</>}
          </button>
        </form>
      </div>

      <div className="md:w-1/2 bg-black/30 border border-white/5 rounded-lg p-6 relative overflow-hidden">
        {/* Decorative Grid */}
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        ></div>

        <div className="relative z-10">
          <h3 className="text-brand-purple font-bold mb-6 tracking-widest text-sm">
            SECURE_CHANNELS
          </h3>

          <div className="space-y-6">
            <div className="flex items-start gap-4 p-4 bg-white/5 rounded border border-white/10 hover:border-brand-purple/50 transition-colors cursor-pointer group">
              <div className="p-2 bg-brand-purple/20 text-brand-purple rounded">
                <Mail size={20} />
              </div>
              <div>
                <div className="text-xs text-gray-500 font-mono mb-1">
                  DIRECT_MAIL
                </div>
                <div className="text-white font-mono group-hover:text-brand-neon transition-colors">
                  contact@muneer.dev
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white/5 rounded border border-white/10 hover:border-brand-blue/50 transition-colors cursor-pointer group">
              <div className="p-2 bg-brand-blue/20 text-brand-blue rounded">
                <Globe size={20} />
              </div>
              <div>
                <div className="text-xs text-gray-500 font-mono mb-1">
                  GLOBAL_NETWORK
                </div>
                <div className="text-white font-mono group-hover:text-brand-neon transition-colors">
                  @muneer320
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  Found on Top Social Platforms
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white/5 rounded border border-white/10 hover:border-brand-neon/50 transition-colors group">
              <div className="p-2 bg-brand-neon/20 text-brand-neon rounded">
                <MapPin size={20} />
              </div>
              <div>
                <div className="text-xs text-gray-500 font-mono mb-1">
                  BASE_LOCATION
                </div>
                <div className="text-white font-mono group-hover:text-brand-neon transition-colors">
                  Bangalore, IN
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  Scaler School of Technology
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
