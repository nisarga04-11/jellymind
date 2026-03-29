import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { LumiJellyfish } from "../components/LumiJellyfish";

type BreathPhase = "inhale" | "hold" | "exhale" | "idle";

interface Phase {
  phase: BreathPhase;
  label: string;
  duration: number;
}

interface Technique {
  id: string;
  name: string;
  desc: string;
  phases: Phase[];
  color: string;
}

const techniques: Technique[] = [
  {
    id: "478",
    name: "4-7-8 Breathing",
    desc: "Calms the nervous system and promotes deep sleep.",
    color: "#62D9FF",
    phases: [
      { phase: "inhale", label: "Inhale", duration: 4 },
      { phase: "hold", label: "Hold", duration: 7 },
      { phase: "exhale", label: "Exhale", duration: 8 },
    ],
  },
  {
    id: "box",
    name: "Box Breathing",
    desc: "Enhances focus and reduces stress for peak performance.",
    color: "#A77BFF",
    phases: [
      { phase: "inhale", label: "Inhale", duration: 4 },
      { phase: "hold", label: "Hold", duration: 4 },
      { phase: "exhale", label: "Exhale", duration: 4 },
      { phase: "hold", label: "Hold", duration: 4 },
    ],
  },
  {
    id: "ocean",
    name: "Ocean Breathing",
    desc: "Slow, rhythmic breathing like ocean waves for deep calm.",
    color: "#7FE6FF",
    phases: [
      { phase: "inhale", label: "Inhale", duration: 6 },
      { phase: "exhale", label: "Exhale", duration: 6 },
    ],
  },
];

export function BreathingPage() {
  const [selected, setSelected] = useState(techniques[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentPhase = selected.phases[phaseIndex];

  const stop = () => {
    setIsRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const start = () => {
    setPhaseIndex(0);
    setCountdown(selected.phases[0].duration);
    setIsRunning(true);
  };

  useEffect(() => {
    if (!isRunning) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          const nextIndex = (phaseIndex + 1) % selected.phases.length;
          setPhaseIndex(nextIndex);
          return selected.phases[nextIndex].duration;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, phaseIndex, selected]);

  const circleScale = isRunning
    ? currentPhase.phase === "inhale"
      ? 1.6
      : currentPhase.phase === "exhale"
        ? 0.8
        : 1.2
    : 1;

  return (
    <main className="relative z-10 pb-20">
      <div className="mx-auto max-w-5xl px-6 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display font-bold text-4xl text-white mb-2">
            Breathing
          </h1>
          <p className="mb-8" style={{ color: "#B9D3E6" }}>
            Breathe with Lumi
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-3 mb-10">
          {techniques.map((t) => (
            <button
              type="button"
              key={t.id}
              onClick={() => {
                stop();
                setSelected(t);
                setPhaseIndex(0);
              }}
              className="px-5 py-2.5 rounded-full text-sm font-medium transition-all"
              style={{
                background:
                  selected.id === t.id
                    ? `${t.color}22`
                    : "rgba(255,255,255,0.06)",
                color: selected.id === t.id ? t.color : "#86A9C2",
                border:
                  selected.id === t.id
                    ? `1px solid ${t.color}55`
                    : "1px solid transparent",
              }}
              data-ocid="breathing.tab"
            >
              {t.name}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col items-center">
            <div
              className="relative flex items-center justify-center"
              style={{ width: 280, height: 280 }}
            >
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: 220,
                  height: 220,
                  border: `2px solid ${selected.color}44`,
                  boxShadow: `0 0 30px ${selected.color}22`,
                }}
                animate={{ scale: circleScale }}
                transition={{
                  duration: currentPhase?.duration || 1,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: 160,
                  height: 160,
                  background: `radial-gradient(circle, ${selected.color}44 0%, ${selected.color}11 70%, transparent 100%)`,
                  boxShadow: `0 0 40px ${selected.color}44`,
                }}
                animate={{ scale: circleScale }}
                transition={{
                  duration: currentPhase?.duration || 1,
                  ease: "easeInOut",
                }}
              />
              <LumiJellyfish
                size={90}
                animated={isRunning}
                breathPhase={isRunning ? currentPhase.phase : "idle"}
                className="relative z-10"
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={isRunning ? `${phaseIndex}-${currentPhase.label}` : "idle"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center mt-6"
              >
                <p
                  className="font-display font-bold text-3xl mb-1"
                  style={{ color: isRunning ? selected.color : "#B9D3E6" }}
                >
                  {isRunning ? currentPhase.label : "Ready"}
                </p>
                {isRunning && (
                  <p className="font-display font-semibold text-5xl text-white">
                    {countdown}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>

            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={isRunning ? stop : start}
              className="mt-8 px-10 py-3 rounded-full font-semibold text-sm btn-glow"
              style={{
                background: isRunning
                  ? "rgba(255,255,255,0.1)"
                  : `linear-gradient(135deg, ${selected.color}cc, ${selected.color})`,
                color: isRunning ? "#B9D3E6" : "#04121F",
              }}
              data-ocid="breathing.primary_button"
            >
              {isRunning ? "Stop" : "Begin Breathing"}
            </motion.button>
          </div>

          <div>
            <div className="glass-strong rounded-3xl p-8">
              <h2 className="font-display font-bold text-2xl text-white mb-2">
                {selected.name}
              </h2>
              <p className="mb-6" style={{ color: "#B9D3E6" }}>
                {selected.desc}
              </p>
              <h3
                className="font-semibold text-sm mb-4"
                style={{ color: "#62D9FF" }}
              >
                Phase Guide
              </h3>
              <div className="space-y-3">
                {selected.phases.map((p, i) => (
                  <div
                    key={`${p.phase}-${i}`}
                    className="flex items-center justify-between rounded-xl px-4 py-3 transition-all"
                    style={{
                      background:
                        isRunning && phaseIndex === i
                          ? `${selected.color}18`
                          : "rgba(255,255,255,0.04)",
                      border:
                        isRunning && phaseIndex === i
                          ? `1px solid ${selected.color}44`
                          : "1px solid transparent",
                    }}
                  >
                    <span className="text-sm font-medium text-white">
                      {p.label}
                    </span>
                    <span className="text-sm" style={{ color: "#86A9C2" }}>
                      {p.duration}s
                    </span>
                  </div>
                ))}
              </div>
              <div
                className="mt-6 p-4 rounded-xl"
                style={{
                  background: "rgba(98,217,255,0.06)",
                  border: "1px solid rgba(98,217,255,0.12)",
                }}
              >
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "#86A9C2" }}
                >
                  💡 Lumi's Tip: Breathe through your nose on inhale. Let your
                  belly expand first, then your chest. Exhale slowly through
                  slightly parted lips.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
