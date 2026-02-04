// Procedural Audio Engine for Sci-Fi Sounds

let audioCtx: AudioContext | null = null;
let bgOscillators: any[] = [];
// let bgGainNodes: GainNode[] = [];

// Initialize Audio Context on user interaction (browsers require this)
export const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (
      window.AudioContext || (window as any).webkitAudioContext
    )();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
};

// Play a short UI sound
export const playSound = (type: "hover" | "click" | "switch") => {
  if (!audioCtx) initAudio();
  if (!audioCtx) return;

  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  const now = audioCtx.currentTime;

  if (type === "hover") {
    // High pitched short blip
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);

    gainNode.gain.setValueAtTime(0.15, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.start(now);
    osc.stop(now + 0.05);
  } else if (type === "click") {
    // Futuristic confirm sound
    osc.type = "triangle"; // Richer sound
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.1);

    gainNode.gain.setValueAtTime(0.25, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.start(now);
    osc.stop(now + 0.15);
  } else if (type === "switch") {
    // Lower mechanical switch
    osc.type = "square";
    osc.frequency.setValueAtTime(150, now);

    gainNode.gain.setValueAtTime(0.15, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    osc.start(now);
    osc.stop(now + 0.1);
  }
};

// Start Ambient Drone (Space Ship Hum)
export const startAmbience = () => {
  if (!audioCtx) initAudio();
  if (!audioCtx || bgOscillators.length > 0) return;

  // Create Brown Noise-ish drone using Low Freq Oscillators
  const osc1 = audioCtx.createOscillator();
  const osc2 = audioCtx.createOscillator();
  const gain1 = audioCtx.createGain();
  const gain2 = audioCtx.createGain();
  const masterFilter = audioCtx.createBiquadFilter();

  // Deep Hum
  osc1.type = "sawtooth";
  osc1.frequency.value = 50;
  gain1.gain.value = 0.08;

  // Higher wobble
  osc2.type = "sine";
  osc2.frequency.value = 55;
  gain2.gain.value = 0.06;

  // Lowpass filter to muffle it into a "hum"
  masterFilter.type = "lowpass";
  masterFilter.frequency.value = 120;
  masterFilter.Q.value = 1;

  osc1.connect(gain1);
  osc2.connect(gain2);

  // Connect to filter then destination
  gain1.connect(masterFilter);
  gain2.connect(masterFilter);
  masterFilter.connect(audioCtx.destination);

  osc1.start();
  osc2.start();

  bgOscillators = [osc1, osc2];
  // bgGainNodes = [gain1, gain2];
};

export const stopAmbience = () => {
  bgOscillators.forEach((osc) => osc.stop());
  bgOscillators = [];
  // bgGainNodes = [];
};
