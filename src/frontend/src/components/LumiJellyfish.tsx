import { motion } from "motion/react";

interface LumiJellyfishProps {
  size?: number;
  className?: string;
  animated?: boolean;
  breathPhase?: "inhale" | "hold" | "exhale" | "idle";
}

export function LumiJellyfish({
  size = 120,
  className = "",
  animated = true,
  breathPhase = "idle",
}: LumiJellyfishProps) {
  const scaleMap = { inhale: 1.25, hold: 1.25, exhale: 0.85, idle: 1 };
  const targetScale = scaleMap[breathPhase];

  return (
    <motion.div
      className={`inline-block ${className}`}
      animate={
        animated
          ? {
              y: breathPhase === "idle" ? [0, -12, -5, 0] : 0,
              scale: breathPhase !== "idle" ? targetScale : [1, 1.03, 1],
            }
          : {}
      }
      transition={
        animated
          ? {
              y: {
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
              scale:
                breathPhase !== "idle"
                  ? {
                      duration:
                        breathPhase === "inhale"
                          ? 4
                          : breathPhase === "hold"
                            ? 0.1
                            : 8,
                      ease: "easeInOut",
                    }
                  : {
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    },
            }
          : {}
      }
    >
      <svg
        width={size}
        height={size * 1.4}
        viewBox="0 0 100 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Lumi the jellyfish guide"
      >
        <defs>
          <radialGradient id="bellGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#9EF0FF" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#62D9FF" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#2079B8" stopOpacity="0.5" />
          </radialGradient>
          <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#C084FC" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#A77BFF" stopOpacity="0.3" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="softglow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <ellipse
          cx="50"
          cy="38"
          rx="42"
          ry="36"
          fill="#62D9FF"
          opacity="0.08"
        />
        <ellipse
          cx="50"
          cy="38"
          rx="36"
          ry="30"
          fill="#A77BFF"
          opacity="0.06"
        />
        <path
          d="M10,42 Q10,8 50,6 Q90,8 90,42 Q90,68 50,72 Q10,68 10,42 Z"
          fill="url(#bellGrad)"
          filter="url(#glow)"
          opacity="0.9"
        />
        <path
          d="M10,42 Q30,70 50,72 Q70,70 90,42"
          stroke="#7FE6FF"
          strokeWidth="0.8"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M22,40 Q22,18 50,16 Q78,18 78,40 Q78,62 50,65 Q22,62 22,40 Z"
          fill="rgba(150,230,255,0.12)"
        />
        <ellipse
          cx="50"
          cy="36"
          rx="16"
          ry="14"
          fill="url(#coreGrad)"
          filter="url(#softglow)"
          opacity="0.85"
        />
        <circle cx="44" cy="30" r="3" fill="white" opacity="0.6" />
        <circle cx="54" cy="32" r="2" fill="white" opacity="0.4" />
        <circle cx="50" cy="40" r="4" fill="#D18CFF" opacity="0.5" />
        <ellipse
          cx="42"
          cy="36"
          rx="3"
          ry="3.5"
          fill="#0B1E30"
          opacity="0.85"
        />
        <ellipse
          cx="58"
          cy="36"
          rx="3"
          ry="3.5"
          fill="#0B1E30"
          opacity="0.85"
        />
        <circle cx="43" cy="35" r="1" fill="white" opacity="0.9" />
        <circle cx="59" cy="35" r="1" fill="white" opacity="0.9" />
        <path
          d="M45,43 Q50,47 55,43"
          stroke="#7FE6FF"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        <motion.path
          d="M30,70 Q27,85 30,100 Q33,115 29,130"
          stroke="#62D9FF"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
          animate={
            animated
              ? {
                  d: [
                    "M30,70 Q27,85 30,100 Q33,115 29,130",
                    "M30,70 Q33,85 30,100 Q27,115 31,130",
                    "M30,70 Q27,85 30,100 Q33,115 29,130",
                  ],
                }
              : {}
          }
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.path
          d="M70,70 Q73,85 70,100 Q67,115 71,130"
          stroke="#62D9FF"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
          animate={
            animated
              ? {
                  d: [
                    "M70,70 Q73,85 70,100 Q67,115 71,130",
                    "M70,70 Q67,85 70,100 Q73,115 69,130",
                    "M70,70 Q73,85 70,100 Q67,115 71,130",
                  ],
                }
              : {}
          }
          transition={{
            duration: 4.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
        <motion.path
          d="M40,72 Q37,84 40,96 Q43,108 40,120"
          stroke="#A77BFF"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          opacity="0.6"
          animate={
            animated
              ? {
                  d: [
                    "M40,72 Q37,84 40,96 Q43,108 40,120",
                    "M40,72 Q43,84 40,96 Q37,108 41,120",
                    "M40,72 Q37,84 40,96 Q43,108 40,120",
                  ],
                }
              : {}
          }
          transition={{
            duration: 3.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.8,
          }}
        />
        <motion.path
          d="M60,72 Q63,84 60,96 Q57,108 60,120"
          stroke="#A77BFF"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          opacity="0.6"
          animate={
            animated
              ? {
                  d: [
                    "M60,72 Q63,84 60,96 Q57,108 60,120",
                    "M60,72 Q57,84 60,96 Q63,108 59,120",
                    "M60,72 Q63,84 60,96 Q57,108 60,120",
                  ],
                }
              : {}
          }
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1.2,
          }}
        />
        <motion.path
          d="M50,73 Q47,82 50,92 Q53,102 50,112"
          stroke="#7FE6FF"
          strokeWidth="1.0"
          fill="none"
          strokeLinecap="round"
          opacity="0.55"
          animate={
            animated
              ? {
                  d: [
                    "M50,73 Q47,82 50,92 Q53,102 50,112",
                    "M50,73 Q53,82 50,92 Q47,102 51,112",
                    "M50,73 Q47,82 50,92 Q53,102 50,112",
                  ],
                }
              : {}
          }
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.3,
          }}
        />
        <circle
          cx="35"
          cy="32"
          r="1.5"
          fill="#7FE6FF"
          opacity="0.6"
          filter="url(#softglow)"
        />
        <circle
          cx="65"
          cy="30"
          r="1.2"
          fill="#7FE6FF"
          opacity="0.5"
          filter="url(#softglow)"
        />
        <circle
          cx="50"
          cy="22"
          r="1"
          fill="#D18CFF"
          opacity="0.7"
          filter="url(#softglow)"
        />
      </svg>
    </motion.div>
  );
}
