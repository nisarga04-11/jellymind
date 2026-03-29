import { Clock, Smile, TrendingUp, Zap } from "lucide-react";
import { motion } from "motion/react";
import { LumiJellyfish } from "../components/LumiJellyfish";
import {
  useMeditationHistory,
  useMoodHistory,
  useTotalMeditationMinutes,
} from "../hooks/useQueries";

export function ProgressPage() {
  const { data: meditationHistory = [] } = useMeditationHistory();
  const { data: totalMinutes = BigInt(0) } = useTotalMeditationMinutes();
  const { data: moodHistory = [] } = useMoodHistory();

  const avgMood = moodHistory.length
    ? moodHistory.reduce((sum, e) => sum + Number(e.score), 0) /
      moodHistory.length
    : 0;

  const stats = [
    {
      icon: <Clock size={22} />,
      value: String(meditationHistory.length),
      label: "Total Sessions",
      color: "#62D9FF",
    },
    {
      icon: <Zap size={22} />,
      value: String(Number(totalMinutes)),
      label: "Total Minutes",
      color: "#A77BFF",
    },
    {
      icon: <TrendingUp size={22} />,
      value: `${Math.min(meditationHistory.length, 7)}d`,
      label: "Current Streak",
      color: "#7FE6FF",
    },
    {
      icon: <Smile size={22} />,
      value: avgMood ? avgMood.toFixed(1) : "—",
      label: "Avg Mood",
      color: "#D18CFF",
    },
  ];

  const hasProgress = meditationHistory.length > 0 || moodHistory.length > 0;

  const sessionBreakdown = Object.entries(
    meditationHistory.reduce((acc: Record<string, number>, s) => {
      acc[s.sessionType] = (acc[s.sessionType] || 0) + Number(s.duration);
      return acc;
    }, {}),
  );

  return (
    <main className="relative z-10 pb-20">
      <div className="mx-auto max-w-5xl px-6 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display font-bold text-4xl text-white mb-2">
            Your Progress
          </h1>
          <p className="mb-8" style={{ color: "#B9D3E6" }}>
            Celebrate your wellness journey
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-5 text-center"
              data-ocid="progress.item.1"
            >
              <div
                className="flex justify-center mb-2"
                style={{ color: s.color }}
              >
                {s.icon}
              </div>
              <p className="font-display font-bold text-3xl text-white">
                {s.value}
              </p>
              <p className="text-xs mt-1" style={{ color: "#86A9C2" }}>
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="glass-strong rounded-3xl p-10 text-center mb-10"
        >
          <div className="flex justify-center mb-4">
            <LumiJellyfish size={160} animated />
          </div>
          {hasProgress ? (
            <>
              <p className="font-display font-bold text-2xl text-white mb-2">
                Lumi is so proud of you! 🌟
              </p>
              <p className="text-base" style={{ color: "#B9D3E6" }}>
                Every meditation, every breath, every mood check-in ripples
                outward like bioluminescence through the ocean. You are building
                something beautiful.
              </p>
            </>
          ) : (
            <>
              <p className="font-display font-bold text-2xl text-white mb-2">
                Your journey begins here
              </p>
              <p className="text-base" style={{ color: "#B9D3E6" }}>
                Start your first meditation or log your mood to see Lumi
                celebrate your progress!
              </p>
            </>
          )}
        </motion.div>

        {meditationHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6 mb-6"
          >
            <h3 className="font-display font-semibold text-white mb-5">
              Session Breakdown
            </h3>
            <div className="space-y-3">
              {sessionBreakdown.map(([type, mins]) => (
                <div key={type} className="flex items-center gap-3">
                  <span className="text-sm text-white w-32 truncate capitalize">
                    {type.replace(/-/g, " ")}
                  </span>
                  <div
                    className="flex-1 h-2 rounded-full overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{
                        width: `${Math.min((mins / Number(totalMinutes || BigInt(1))) * 100, 100)}%`,
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="h-full rounded-full"
                      style={{
                        background: "linear-gradient(90deg, #A77BFF, #62D9FF)",
                      }}
                    />
                  </div>
                  <span className="text-xs" style={{ color: "#86A9C2" }}>
                    {mins}m
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {moodHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="font-display font-semibold text-white mb-5">
              Mood Timeline
            </h3>
            <div
              className="flex items-end gap-2 h-24"
              data-ocid="progress.panel"
            >
              {moodHistory.slice(-14).map((entry, i) => (
                <motion.div
                  key={`${entry.timestamp}-${i}`}
                  initial={{ height: 0 }}
                  whileInView={{
                    height: `${(Number(entry.score) / 5) * 100}%`,
                  }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className="flex-1 rounded-t-sm"
                  style={{
                    background: "linear-gradient(to top, #2FB9FF, #A77BFF)",
                    opacity: 0.7 + (Number(entry.score) / 5) * 0.3,
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs" style={{ color: "#86A9C2" }}>
                Earlier
              </span>
              <span className="text-xs" style={{ color: "#86A9C2" }}>
                Recent
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
