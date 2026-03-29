import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { SiInstagram, SiX, SiYoutube } from "react-icons/si";
import { LumiJellyfish } from "./LumiJellyfish";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer
      className="relative z-10 border-t"
      style={{ borderColor: "rgba(255,255,255,0.08)" }}
    >
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <LumiJellyfish size={32} animated={false} />
              <span className="font-display font-bold text-xl text-white">
                Jelly<span style={{ color: "#62D9FF" }}>Mind</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#86A9C2" }}>
              Your ocean of calm awaits. Guided by Lumi, the bioluminescent
              jellyfish of peace.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80"
                style={{ color: "#86A9C2" }}
              >
                <SiInstagram size={18} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80"
                style={{ color: "#86A9C2" }}
              >
                <SiX size={18} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80"
                style={{ color: "#86A9C2" }}
              >
                <SiYoutube size={18} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Navigate</h4>
            <div className="space-y-2">
              {[
                { label: "Home", to: "/" },
                { label: "Meditation", to: "/meditation" },
                { label: "Breathing", to: "/breathing" },
                { label: "Mood & Wellness", to: "/mood" },
                { label: "Progress", to: "/progress" },
              ].map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="block text-sm transition-colors hover:text-white"
                  style={{ color: "#86A9C2" }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">
              Wellness Practices
            </h4>
            <div className="space-y-2">
              {[
                "4-7-8 Breathing",
                "Box Breathing",
                "Ocean Breathing",
                "Body Scan Meditation",
                "Deep Relaxation",
              ].map((item) => (
                <p key={item} className="text-sm" style={{ color: "#86A9C2" }}>
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div
          className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-2"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <p className="text-xs" style={{ color: "#86A9C2" }}>
            {"\u00a9 "}
            {year}
            {" Built with "}
            <Heart
              size={12}
              className="inline text-red-400"
              fill="currentColor"
            />
            {" using "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              style={{ color: "#62D9FF" }}
            >
              caffeine.ai
            </a>
          </p>
          <p className="text-xs" style={{ color: "#86A9C2" }}>
            JellyMind — Find your inner ocean
          </p>
        </div>
      </div>
    </footer>
  );
}
