import { useState, useEffect } from "react";

export const L = {
  bg: "#FAFAF8", bg2: "#F0EDE6", bg3: "#FFF", tx: "#0F0F0F", tx2: "#3D3D3D", tx3: "#888",
  ac: "#6D28D9", ac2: "#8B5CF6", acS: "#EDE9FE", bd: "#DDD9D2", gls: "rgba(250,250,248,.85)",
  sh2: "0 12px 64px rgba(109,40,217,.14)", ok: "#059669", okB: "#ECFDF5", warn: "#D97706",
};

export const D = {
  bg: "#07070B", bg2: "#0D0D15", bg3: "#14141E", tx: "#F0F0F5", tx2: "#9898B0", tx3: "#55556B",
  ac: "#A78BFA", ac2: "#C4B5FD", acS: "rgba(167,139,250,.1)", bd: "#1E1E32", gls: "rgba(7,7,11,.82)",
  sh2: "0 12px 64px rgba(167,139,250,.1)", ok: "#34D399", okB: "rgba(52,211,153,.08)", warn: "#FBBF24",
};

const THEME_KEY = "fitcrave-theme";

export function getTheme(mode) {
  const t = mode === "dark" ? D : L;
  const SF = "'Instrument Serif',Georgia,serif";
  const SS = "'Syne',system-ui,sans-serif";
  const SM = "'JetBrains Mono',monospace";
  const acG = mode === "dark"
    ? "linear-gradient(135deg,#C4B5FD,#A78BFA 40%,#7C3AED)"
    : "linear-gradient(135deg,#6D28D9,#7C3AED 40%,#A78BFA)";
  const acT = {
    background: acG,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };
  return { t, SF, SS, SM, acG, acT };
}

export function useSiteTheme() {
  const [mode, setMode] = useState(() => localStorage.getItem(THEME_KEY) || "dark");
  useEffect(() => { localStorage.setItem(THEME_KEY, mode); }, [mode]);
  return { mode, setMode, ...getTheme(mode) };
}

export const FONTS_LINK = "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap";
