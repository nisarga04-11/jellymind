import { Textarea } from "@/components/ui/textarea";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { LumiJellyfish } from "../components/LumiJellyfish";
import {
  useLogMood,
  useMoodHistory,
  useRandomHealthTip,
} from "../hooks/useQueries";

const moodOptions = [
  { score: 1, emoji: "😔", label: "Struggling" },
  { score: 2, emoji: "😕", label: "Low" },
  { score: 3, emoji: "😐", label: "Neutral" },
  { score: 4, emoji: "🙂", label: "Good" },
  { score: 5, emoji: "😊", label: "Wonderful" },
];

const lumiAdvice: Record<number, string> = {
  1: "I feel your heaviness today. Even in the deepest ocean, there is always light. Take one gentle breath with me.",
  2: "The tides ebb and flow — so do our feelings. You are not alone. Rest here with me for a moment.",
  3: "A calm ocean has its own beauty. Neutrality is a resting place, not a destination. Let's breathe together.",
  4: "Your energy ripples with brightness! Lumi glows with you. Keep nurturing what brings you joy.",
  5: "You are radiant today! Lumi dances in the light you carry. Share your warmth with the world! 🌟",
};

export function MoodPage() {
  const [selectedScore, setSelectedScore] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { data: history = [] } = useMoodHistory();
  const { data: healthTip } = useRandomHealthTip();
  const { mutate: logMood, isPending } = useLogMood();

  const handleSubmit = () => {
    if (!selectedScore) return;
    logMood(
      { score: BigInt(selectedScore), note: note.trim() || null },
      {
        onSuccess: () => {
          toast.success("Mood logged! 🌊");
          setSubmitted(true);
        },
        onError: () => toast.error("Failed to log mood"),
      },
    );
  };

  const avgMood = history.length
    ? (
        history.reduce((sum, e) => sum + Number(e.score), 0) / history.length
      ).toFixed(1)
    : "—";

  return (
    <main className="relative z-10 pb-20">
      <div className="mx-auto max-w-5xl px-6 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display font-bold text-4xl text-white mb-2">
            Mood & Wellness
          </h1>
          <p className="mb-8" style={{ color: "#B9D3E6" }}>
            How are you feeling today?
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <div className="glass-strong rounded-3xl p-8">
              <div className="flex justify-center mb-6">
                <LumiJellyfish size={90} animated />
              </div>
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                    data-ocid="mood.success_state"
                  >
                    <p className="font-display font-bold text-2xl text-white mb-3">
                      Logged! 🌊
                    </p>
                    {selectedScore && (
                      <div className="glass rounded-2xl p-4 mb-4">
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: "#B9D3E6" }}
                        >
                          {lumiAdvice[selectedScore]}
                        </p>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setSelectedScore(null);
                        setNote("");
                      }}
                      className="px-6 py-2 rounded-full text-sm font-medium"
                      style={{
                        background: "rgba(98,217,255,0.12)",
                        color: "#62D9FF",
                      }}
                      data-ocid="mood.secondary_button"
                    >
                      Log Again
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="form">
                    <h2 className="font-display font-semibold text-xl text-white text-center mb-6">
                      How is your ocean today?
                    </h2>
                    <div className="flex justify-center gap-3 mb-6">
                      {moodOptions.map((opt) => (
                        <motion.button
                          type="button"
                          key={opt.score}
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setSelectedScore(opt.score)}
                          className="flex flex-col items-center gap-1 p-2 rounded-2xl transition-all"
                          style={{
                            background:
                              selectedScore === opt.score
                                ? "rgba(98,217,255,0.15)"
                                : "transparent",
                            border:
                              selectedScore === opt.score
                                ? "1px solid rgba(98,217,255,0.4)"
                                : "1px solid transparent",
                          }}
                          data-ocid="mood.radio"
                        >
                          <span className="text-3xl">{opt.emoji}</span>
                          <span
                            className="text-xs"
                            style={{
                              color:
                                selectedScore === opt.score
                                  ? "#62D9FF"
                                  : "#86A9C2",
                            }}
                          >
                            {opt.label}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                    {selectedScore && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass rounded-xl p-4 mb-4"
                      >
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: "#B9D3E6" }}
                        >
                          {lumiAdvice[selectedScore]}
                        </p>
                      </motion.div>
                    )}
                    <Textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Add a note (optional)..."
                      className="mb-4 resize-none text-sm"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "#B9D3E6",
                      }}
                      rows={3}
                      data-ocid="mood.textarea"
                    />
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubmit}
                      disabled={!selectedScore || isPending}
                      className="w-full py-3 rounded-full font-semibold text-sm btn-glow disabled:opacity-40"
                      style={{
                        background: "linear-gradient(135deg, #2FB9FF, #62D9FF)",
                        color: "#04121F",
                      }}
                      data-ocid="mood.submit_button"
                    >
                      {isPending ? "Logging..." : "Log My Mood"}
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display font-semibold text-white mb-4">
                Mood Overview
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p
                    className="text-3xl font-display font-bold"
                    style={{ color: "#62D9FF" }}
                  >
                    {avgMood}
                  </p>
                  <p className="text-xs mt-1" style={{ color: "#86A9C2" }}>
                    Average Mood
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-display font-bold text-white">
                    {history.length}
                  </p>
                  <p className="text-xs mt-1" style={{ color: "#86A9C2" }}>
                    Check-ins
                  </p>
                </div>
              </div>
            </div>

            {history.length > 0 ? (
              <div className="glass rounded-2xl p-6">
                <h3 className="font-display font-semibold text-white mb-4">
                  Recent Moods
                </h3>
                <div className="space-y-3" data-ocid="mood.list">
                  {history
                    .slice(-7)
                    .reverse()
                    .map((entry, i) => (
                      <div
                        key={`${entry.timestamp}-${i}`}
                        className="flex items-center gap-3"
                        data-ocid={`mood.item.${i + 1}`}
                      >
                        <span className="text-lg">
                          {moodOptions.find(
                            (o) => o.score === Number(entry.score),
                          )?.emoji ?? "😐"}
                        </span>
                        <div className="flex-1">
                          <div
                            className="h-2 rounded-full overflow-hidden"
                            style={{ background: "rgba(255,255,255,0.08)" }}
                          >
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{
                                width: `${(Number(entry.score) / 5) * 100}%`,
                              }}
                              transition={{ delay: i * 0.05, duration: 0.6 }}
                              className="h-full rounded-full"
                              style={{
                                background:
                                  "linear-gradient(90deg, #2FB9FF, #62D9FF)",
                              }}
                            />
                          </div>
                        </div>
                        <span className="text-xs" style={{ color: "#86A9C2" }}>
                          {new Date(
                            Number(entry.timestamp) / 1_000_000,
                          ).toLocaleDateString("en", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <div
                className="glass rounded-2xl p-6 text-center"
                data-ocid="mood.empty_state"
              >
                <p className="text-sm" style={{ color: "#86A9C2" }}>
                  No mood entries yet. Log your first check-in!
                </p>
              </div>
            )}

            {healthTip && (
              <div className="glass rounded-2xl p-6">
                <p
                  className="text-xs font-semibold tracking-widest uppercase mb-2"
                  style={{ color: "#62D9FF" }}
                >
                  Lumi's Wellness Tip
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#B9D3E6" }}
                >
                  {healthTip}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
