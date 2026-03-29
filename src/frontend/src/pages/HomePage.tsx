import { Link } from "@tanstack/react-router";
import { Brain, ChevronRight, Heart, Smile, Star, Wind } from "lucide-react";
import { motion } from "motion/react";
import { LumiJellyfish } from "../components/LumiJellyfish";
import { useRandomAffirmation, useRandomHealthTip } from "../hooks/useQueries";

const features = [
  {
    icon: <Brain size={28} />,
    title: "Meditation Sessions",
    desc: "Guided ocean-inspired meditations to calm your mind and restore inner peace.",
    color: "#62D9FF",
  },
  {
    icon: <Heart size={28} />,
    title: "Health Counseling",
    desc: "Personalized wellness insights and daily tips curated by Lumi just for you.",
    color: "#A77BFF",
  },
  {
    icon: <Wind size={28} />,
    title: "Breathing Exercises",
    desc: "Rhythmic breathing patterns synchronized with Lumi's gentle pulse.",
    color: "#7FE6FF",
  },
  {
    icon: <Smile size={28} />,
    title: "Mood Tracking",
    desc: "Check in daily, track your emotional tides, and celebrate your growth.",
    color: "#D18CFF",
  },
];

const testimonials = [
  {
    name: "Marina Chen",
    role: "Yoga instructor",
    text: "JellyMind transformed my mornings. Lumi guides me through breathing sessions that feel like floating in a peaceful ocean.",
  },
  {
    name: "James Whitmore",
    role: "Software engineer",
    text: "The mood tracking helped me notice patterns I never saw before. My stress levels dropped significantly within two weeks.",
  },
  {
    name: "Sophia Reyes",
    role: "Nurse practitioner",
    text: "I recommend JellyMind to all my patients seeking mindfulness. The ocean theme is uniquely calming and effective.",
  },
];

export function HomePage() {
  const { data: affirmation } = useRandomAffirmation();
  const { data: healthTip } = useRandomHealthTip();

  return (
    <main className="relative z-10 pb-20">
      <section className="mx-auto max-w-4xl px-6 pt-12 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="glass-strong rounded-3xl p-10 md:p-16 glow-cyan">
            <div className="flex justify-center mb-6">
              <LumiJellyfish size={140} animated />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-6xl text-white mb-4 leading-tight">
              Find Your<span className="text-cyan-glow"> Inner Ocean</span>
            </h1>
            <p
              className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed"
              style={{ color: "#B9D3E6" }}
            >
              Let Lumi, your bioluminescent jellyfish guide, lead you through
              the calming depths of mindfulness, breathing, and holistic
              wellness.
            </p>
            <Link to="/meditation" data-ocid="home.primary_button">
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-full text-base font-bold btn-glow"
                style={{
                  background: "linear-gradient(135deg, #2FB9FF, #62D9FF)",
                  color: "#04121F",
                }}
              >
                Begin Your Journey
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
              className="glass rounded-2xl p-6 flex flex-col items-start gap-3"
              data-ocid={`home.item.${i + 1}`}
            >
              <div style={{ color: f.color }}>{f.icon}</div>
              <h3 className="font-display font-semibold text-white text-sm">
                {f.title}
              </h3>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "#86A9C2" }}
              >
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-strong rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-10"
        >
          <div className="flex-shrink-0">
            <LumiJellyfish size={180} animated />
          </div>
          <div className="flex-1 text-left">
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ color: "#62D9FF" }}
            >
              Your Guide
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
              Meet Lumi
            </h2>
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "#B9D3E6" }}
            >
              Lumi is a bioluminescent jellyfish who drifts through the deep
              ocean with effortless grace. As your personal wellness companion,
              Lumi illuminates your path to mindfulness, breathing harmony, and
              emotional balance — one gentle pulse at a time.
            </p>
            <Link to="/mood" data-ocid="home.secondary_button">
              <motion.button
                type="button"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold"
                style={{
                  border: "1px solid rgba(98,217,255,0.4)",
                  color: "#62D9FF",
                  background: "rgba(98,217,255,0.08)",
                }}
              >
                Learn More <ChevronRight size={16} />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {(affirmation || healthTip) && (
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="grid md:grid-cols-2 gap-6">
            {affirmation && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-6"
                data-ocid="home.card"
              >
                <p
                  className="text-xs font-semibold tracking-widest uppercase mb-3"
                  style={{ color: "#A77BFF" }}
                >
                  Daily Affirmation
                </p>
                <p className="text-lg font-display font-semibold text-white leading-relaxed">
                  "{affirmation}"
                </p>
              </motion.div>
            )}
            {healthTip && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-6"
                data-ocid="home.card"
              >
                <p
                  className="text-xs font-semibold tracking-widest uppercase mb-3"
                  style={{ color: "#62D9FF" }}
                >
                  Lumi's Health Tip
                </p>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "#B9D3E6" }}
                >
                  {healthTip}
                </p>
              </motion.div>
            )}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display font-bold text-3xl text-white text-center mb-10">
            What Our Journeyers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6"
                data-ocid={`home.item.${i + 1}`}
              >
                <div className="flex gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <Star key={j} size={14} fill="#62D9FF" color="#62D9FF" />
                  ))}
                </div>
                <p
                  className="text-sm leading-relaxed mb-5"
                  style={{ color: "#B9D3E6" }}
                >
                  “{t.text}”
                </p>
                <div>
                  <p className="font-semibold text-white text-sm">{t.name}</p>
                  <p className="text-xs" style={{ color: "#86A9C2" }}>
                    {t.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}
