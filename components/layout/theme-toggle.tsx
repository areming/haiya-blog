"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="切换主题"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-fg/70 transition hover:bg-muted-bg hover:text-fg"
    >
      {mounted ? (
        isDark ? <Sun className="h-[15px] w-[15px]" /> : <Moon className="h-[15px] w-[15px]" />
      ) : (
        <span className="h-[15px] w-[15px]" />
      )}
    </button>
  );
}
