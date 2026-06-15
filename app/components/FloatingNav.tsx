"use client";

import { CSSProperties, useCallback, useLayoutEffect, useRef, useState } from "react";

const navItems = [
  { href: "#home", label: "Home", icon: "home" },
  { href: "#services", label: "Services", icon: "sparkle" },
  { href: "#projects", label: "Projects", icon: "briefcase" },
  { href: "#experience", label: "Experience", icon: "user" },
  { href: "#contact", label: "Contact", icon: "mail" },
];

type Indicator = {
  left: number;
  width: number;
};

function NavIcon({ name }: { name: string }) {
  const iconProps = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "home") {
    return (
      <svg {...iconProps}>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v10h14V10" />
        <path d="M10 20v-6h4v6" />
      </svg>
    );
  }

  if (name === "sparkle") {
    return (
      <svg {...iconProps}>
        <path d="M12 3v4" />
        <path d="M12 17v4" />
        <path d="M3 12h4" />
        <path d="M17 12h4" />
        <path d="m18.5 5.5-2.8 2.8" />
        <path d="m8.3 15.7-2.8 2.8" />
        <path d="m5.5 5.5 2.8 2.8" />
        <path d="m15.7 15.7 2.8 2.8" />
      </svg>
    );
  }

  if (name === "briefcase") {
    return (
      <svg {...iconProps}>
        <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M3 13h18" />
      </svg>
    );
  }

  if (name === "user") {
    return (
      <svg {...iconProps}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </svg>
    );
  }

  return (
    <svg {...iconProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export default function FloatingNav() {
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [indicator, setIndicator] = useState<Indicator>({ left: 0, width: 0 });

  const updateIndicator = useCallback((index: number) => {
    const list = listRef.current;
    const item = itemRefs.current[index];

    if (!list || !item) {
      return;
    }

    const listRect = list.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    setIndicator({
      left: itemRect.left - listRect.left + list.scrollLeft,
      width: itemRect.width,
    });
  }, []);

  const activateItem = useCallback(
    (index: number) => {
      setActiveIndex(index);
      updateIndicator(index);
    },
    [updateIndicator],
  );

  useLayoutEffect(() => {
    updateIndicator(activeIndex);

    const handleResize = () => updateIndicator(activeIndex);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [activeIndex, updateIndicator]);

  useLayoutEffect(() => {
    const syncWithHash = () => {
      const hash = window.location.hash || "#home";
      const nextIndex = navItems.findIndex((item) => item.href === hash);

      if (nextIndex >= 0) {
        setSelectedIndex(nextIndex);
        activateItem(nextIndex);
      }
    };

    syncWithHash();
    window.addEventListener("hashchange", syncWithHash);

    return () => window.removeEventListener("hashchange", syncWithHash);
  }, [activateItem]);

  const indicatorStyle = {
    "--nav-highlight-left": `${indicator.left}px`,
    "--nav-highlight-width": `${indicator.width}px`,
  } as CSSProperties;

  return (
    <header className="fixed inset-x-0 top-5 z-30 px-4">
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border border-white/10 bg-[#101010]/88 p-3 shadow-[0_28px_80px_rgb(0_0_0/0.5)] backdrop-blur-xl"
      >
        <div
          ref={listRef}
          className="nav-list flex min-w-0 flex-1 items-center gap-2 overflow-x-auto text-sm font-bold text-neutral-400"
          style={indicatorStyle}
          onMouseLeave={() => activateItem(selectedIndex)}
        >
          <span className="nav-highlight" aria-hidden="true" />
          {navItems.map((item, index) => (
            <a
              key={item.href}
              ref={(element) => {
                itemRefs.current[index] = element;
              }}
              href={item.href}
              className={`nav-pill ${activeIndex === index ? "is-active" : ""}`}
              onClick={() => {
                setSelectedIndex(index);
                activateItem(index);
              }}
              onFocus={() => activateItem(index)}
              onMouseEnter={() => activateItem(index)}
            >
              <NavIcon name={item.icon} />
              {item.label}
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-3 border-l border-white/10 pl-3 sm:flex">
          <button
            type="button"
            aria-label="Toggle dark mode"
            className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-black text-lg"
          >
            <span aria-hidden="true">)</span>
          </button>
          <a href="#contact" className="connect-button">
            Connect
          </a>
        </div>
      </nav>
    </header>
  );
}
