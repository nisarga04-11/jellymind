import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { LumiJellyfish } from "./LumiJellyfish";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Meditation", to: "/meditation" },
  { label: "Breathing", to: "/breathing" },
  { label: "Mood", to: "/mood" },
  { label: "Progress", to: "/progress" },
];

export function NavBar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="relative z-50 w-full">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="glass rounded-2xl px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" data-ocid="nav.link">
            <LumiJellyfish size={36} animated={true} />
            <span className="font-display font-bold text-xl text-white tracking-tight">
              Jelly<span style={{ color: "#62D9FF" }}>Mind</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  data-ocid="nav.link"
                  className="relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                  style={{ color: isActive ? "#62D9FF" : "#B9D3E6" }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: "rgba(98,217,255,0.12)" }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/meditation" data-ocid="nav.primary_button">
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="hidden sm:block px-5 py-2 rounded-full text-sm font-semibold btn-glow"
                style={{
                  background: "linear-gradient(135deg, #2FB9FF, #62D9FF)",
                  color: "#04121F",
                }}
              >
                Start Journey
              </motion.button>
            </Link>
            <button
              type="button"
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-ocid="nav.toggle"
              style={{ color: "#B9D3E6" }}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl mt-2 p-4 flex flex-col gap-1 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid="nav.link"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-medium"
                style={{
                  color: location.pathname === link.to ? "#62D9FF" : "#B9D3E6",
                }}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </header>
  );
}
