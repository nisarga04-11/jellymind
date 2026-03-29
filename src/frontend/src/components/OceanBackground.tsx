import { motion } from "motion/react";

const PARTICLE_INDICES = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
] as const;

function SmallJellyfish({
  x,
  y,
  size,
  delay,
  duration,
}: { x: string; y: string; size: number; delay: number; duration: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ left: x, top: y, opacity: 0.12 }}
      animate={{ y: ["-0%", "-3%", "0%"], rotate: [-2, 2, -2] }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        delay,
      }}
    >
      <svg
        width={size}
        height={size * 1.3}
        viewBox="0 0 60 78"
        fill="none"
        role="img"
        aria-label="Decorative jellyfish"
      >
        <defs>
          <radialGradient
            id={`sg${Math.floor(delay * 10)}`}
            cx="50%"
            cy="40%"
            r="60%"
          >
            <stop offset="0%" stopColor="#9EF0FF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#2079B8" stopOpacity="0.2" />
          </radialGradient>
        </defs>
        <path
          d="M6,25 Q6,5 30,4 Q54,5 54,25 Q54,42 30,44 Q6,42 6,25 Z"
          fill={`url(#sg${Math.floor(delay * 10)})`}
        />
        <path
          d="M16,43 Q14,52 16,61 Q18,70 16,78"
          stroke="#62D9FF"
          strokeWidth="1"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M30,44 Q28,53 30,62 Q32,71 30,78"
          stroke="#A77BFF"
          strokeWidth="1"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M44,43 Q46,52 44,61 Q42,70 44,78"
          stroke="#62D9FF"
          strokeWidth="1"
          fill="none"
          opacity="0.6"
        />
      </svg>
    </motion.div>
  );
}

export function OceanBackground() {
  const jellies = [
    { x: "5%", y: "8%", size: 160, delay: 0, duration: 9 },
    { x: "75%", y: "4%", size: 200, delay: 1.5, duration: 11 },
    { x: "85%", y: "35%", size: 140, delay: 3, duration: 8 },
    { x: "2%", y: "55%", size: 120, delay: 2, duration: 10 },
    { x: "60%", y: "70%", size: 180, delay: 4, duration: 12 },
    { x: "30%", y: "85%", size: 100, delay: 1, duration: 7 },
    { x: "90%", y: "78%", size: 130, delay: 5, duration: 9 },
  ];

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #04121F 0%, #061A2B 40%, #0B2C48 100%)",
        }}
      />
      {PARTICLE_INDICES.map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: (i % 3) * 2 + 2,
            height: (i % 3) * 2 + 2,
            left: `${(i * 5 + 3) % 97}%`,
            top: `${(i * 7 + 11) % 93}%`,
            background:
              i % 3 === 0 ? "#62D9FF" : i % 3 === 1 ? "#A77BFF" : "#7FE6FF",
            opacity: 0.35,
          }}
          animate={{ opacity: [0.2, 0.7, 0.2], scale: [1, 1.5, 1] }}
          transition={{
            duration: 3 + (i % 4),
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i % 5,
          }}
        />
      ))}
      {jellies.map((j) => (
        <SmallJellyfish key={`${j.x}-${j.y}`} {...j} />
      ))}
      <div
        className="absolute"
        style={{
          width: 600,
          height: 600,
          top: -100,
          right: -100,
          background:
            "radial-gradient(circle, rgba(98,217,255,0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute"
        style={{
          width: 500,
          height: 500,
          bottom: 0,
          left: -100,
          background:
            "radial-gradient(circle, rgba(167,123,255,0.05) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
