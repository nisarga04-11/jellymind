import { Clock, Flame, History, Pause, Play, RotateCcw } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { LumiJellyfish } from "../components/LumiJellyfish";
import {
  useLogMeditation,
  useMeditationHistory,
  useTotalMeditationMinutes,
} from "../hooks/useQueries";

const sessions = [
  {
    id: "breathing",
    title: "Breathing Focus",
    desc: "Anchor your awareness to the breath, following each wave in and out.",
    icon: "🌊",
    color: "#62D9FF",
  },
  {
    id: "body-scan",
    title: "Body Scan",
    desc: "Travel through your body with Lumi, releasing tension from head to toe.",
    icon: "✨",
    color: "#A77BFF",
  },
  {
    id: "ocean-viz",
    title: "Ocean Visualization",
    desc: "Dive into a serene underwater world alongside Lumi and the ocean life.",
    icon: "🐚",
    color: "#7FE6FF",
  },
  {
    id: "deep-relax",
    title: "Deep Relaxation",
    desc: "Sink into profound stillness as Lumi guides you to total mental rest.",
    icon: "🌙",
    color: "#D18CFF",
  },
];

const durations = [5, 10, 15, 20];

export function MeditationPage() {
  const [selectedSession, setSelectedSession] = useState(sessions[0]);
  const [selectedDuration, setSelectedDuration] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const [completed, setCompleted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { data: history = [] } = useMeditationHistory();
  const { data: totalMinutes = BigInt(0) } = useTotalMeditationMinutes();
  const { mutate: logMeditation } = useLogMeditation();

  const handleComplete = useCallback(() => {
    setIsRunning(false);
    setCompleted(true);
    logMeditation(
      { duration: BigInt(selectedDuration), sessionType: selectedSession.id },
      { onSuccess: () => toast.success("Session logged! Great work 🌊") },
    );
  }, [selectedDuration, selectedSession.id, logMeditation]);

  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(selectedDuration * 60);
      setCompleted(false);
    }
  }, [selectedDuration, isRunning]);

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          handleComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, handleComplete]);

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
  const circumference = 2 * Math.PI * 70;
  const progress = 1 - timeLeft / (selectedDuration * 60);

  return (
    <main className="relative z-10 pb-20">
      <div className="mx-auto max-w-6xl px-6 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display font-bold text-4xl text-white mb-2">
            Meditation
          </h1>
          <p className="mb-8" style={{ color: "#B9D3E6" }}>
            Drift deeper with Lumi
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="glass rounded-2xl p-5 flex items-center gap-4">
            <Clock size={24} style={{ color: "#62D9FF" }} />
            <div>
              <p className="text-2xl font-display font-bold text-white">
                {Number(totalMinutes)}
              </p>
              <p className="text-xs" style={{ color: "#86A9C2" }}>
                Total Minutes
              </p>
            </div>
          </div>
          <div className="glass rounded-2xl p-5 flex items-center gap-4">
            <Flame size={24} style={{ color: "#D18CFF" }} />
            <div>
              <p className="text-2xl font-display font-bold text-white">
                {history.length}
              </p>
              <p className="text-xs" style={{ color: "#86A9C2" }}>
                Sessions Done
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="font-display font-semibold text-white text-lg">
              Choose Session
            </h2>
            {sessions.map((s, idx) => (
              <motion.button
                key={s.id}
                type="button"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => {
                  if (!isRunning) setSelectedSession(s);
                }}
                className="w-full text-left glass rounded-2xl p-5 flex items-center gap-4 transition-all duration-200"
                style={{
                  border:
                    selectedSession.id === s.id
                      ? `1px solid ${s.color}55`
                      : undefined,
                  boxShadow:
                    selectedSession.id === s.id
                      ? `0 0 20px ${s.color}20`
                      : undefined,
                }}
                data-ocid={`meditation.item.${idx + 1}`}
              >
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <p className="font-semibold text-white text-sm">{s.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#86A9C2" }}>
                    {s.desc}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>

          <div>
            <h2 className="font-display font-semibold text-white text-lg mb-4">
              Session Timer
            </h2>
            <div className="glass-strong rounded-3xl p-8 text-center">
              <AnimatePresence mode="wait">
                {completed ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-4"
                    data-ocid="meditation.success_state"
                  >
                    <LumiJellyfish size={100} animated />
                    <p className="font-display font-bold text-2xl text-white mt-4">
                      Well done! 🌊
                    </p>
                    <p className="text-sm mt-2" style={{ color: "#B9D3E6" }}>
                      Your session has been logged.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="timer">
                    <div className="mb-6">
                      <LumiJellyfish
                        size={80}
                        animated={isRunning}
                        breathPhase={isRunning ? "inhale" : "idle"}
                      />
                    </div>
                    <div className="relative inline-flex items-center justify-center mb-6">
                      <svg
                        width="160"
                        height="160"
                        className="-rotate-90"
                        role="img"
                        aria-label="Timer progress"
                      >
                        <circle
                          cx="80"
                          cy="80"
                          r="70"
                          fill="none"
                          stroke="rgba(255,255,255,0.08)"
                          strokeWidth="6"
                        />
                        <circle
                          cx="80"
                          cy="80"
                          r="70"
                          fill="none"
                          stroke="#62D9FF"
                          strokeWidth="6"
                          strokeLinecap="round"
                          strokeDasharray={`${circumference}`}
                          strokeDashoffset={`${circumference * (1 - progress)}`}
                          style={{
                            transition: "stroke-dashoffset 1s linear",
                            filter: "drop-shadow(0 0 6px #62D9FF)",
                          }}
                        />
                      </svg>
                      <span className="absolute font-display font-bold text-3xl text-white">
                        {formatTime(timeLeft)}
                      </span>
                    </div>
                    <div className="flex justify-center gap-2 mb-6">
                      {durations.map((d) => (
                        <button
                          type="button"
                          key={d}
                          onClick={() => {
                            if (!isRunning) setSelectedDuration(d);
                          }}
                          className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                          style={{
                            background:
                              selectedDuration === d
                                ? "rgba(98,217,255,0.2)"
                                : "rgba(255,255,255,0.06)",
                            color:
                              selectedDuration === d ? "#62D9FF" : "#86A9C2",
                            border:
                              selectedDuration === d
                                ? "1px solid rgba(98,217,255,0.4)"
                                : "1px solid transparent",
                          }}
                          data-ocid="meditation.select"
                        >
                          {d}m
                        </button>
                      ))}
                    </div>
                    <div className="flex justify-center gap-3">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsRunning(!isRunning)}
                        className="px-8 py-3 rounded-full font-semibold text-sm btn-glow"
                        style={{
                          background:
                            "linear-gradient(135deg, #2FB9FF, #62D9FF)",
                          color: "#04121F",
                        }}
                        data-ocid="meditation.primary_button"
                      >
                        {isRunning ? <Pause size={18} /> : <Play size={18} />}
                      </motion.button>
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setIsRunning(false);
                          setTimeLeft(selectedDuration * 60);
                          setCompleted(false);
                        }}
                        className="px-4 py-3 rounded-full"
                        style={{
                          background: "rgba(255,255,255,0.08)",
                          color: "#86A9C2",
                        }}
                        data-ocid="meditation.secondary_button"
                      >
                        <RotateCcw size={18} />
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {history.length > 0 && (
          <div className="mt-10">
            <h2 className="font-display font-semibold text-white text-lg mb-4 flex items-center gap-2">
              <History size={18} style={{ color: "#62D9FF" }} /> Recent Sessions
            </h2>
            <div className="glass rounded-2xl" data-ocid="meditation.table">
              {history
                .slice(-5)
                .reverse()
                .map((s, i) => (
                  <div
                    key={`${s.timestamp}-${i}`}
                    className="flex items-center justify-between px-6 py-4 border-b last:border-b-0"
                    style={{ borderColor: "rgba(255,255,255,0.06)" }}
                    data-ocid={`meditation.row.${i + 1}`}
                  >
                    <span className="text-sm font-medium text-white">
                      {s.sessionType}
                    </span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm" style={{ color: "#86A9C2" }}>
                        {Number(s.duration)} min
                      </span>
                      <span className="text-xs" style={{ color: "#86A9C2" }}>
                        {new Date(
                          Number(s.timestamp) / 1_000_000,
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
