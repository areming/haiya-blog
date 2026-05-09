"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { SearchDialog } from "./search-dialog";

export function SearchTrigger() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        aria-label="搜索"
        onClick={() => setOpen(true)}
        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-fg/70 transition hover:bg-muted-bg hover:text-fg"
      >
        <Search className="h-[15px] w-[15px]" />
      </button>
      {open && <SearchDialog onClose={() => setOpen(false)} />}
    </>
  );
}
