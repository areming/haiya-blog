"use client";

import { useEffect } from "react";

// 仅在挂载它的页面（首页）启用 y proximity snap，离开时还原。
export function SnapScrollEnabler() {
  useEffect(() => {
    const el = document.documentElement;
    const prev = el.style.scrollSnapType;
    el.style.scrollSnapType = "y proximity";
    return () => {
      el.style.scrollSnapType = prev;
    };
  }, []);
  return null;
}
