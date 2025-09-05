"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const ThemesControl = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const themeImages: Record<string, string> = {
    light: "/light.png",
    dark: "/dark.png",
    system: "/system.png",
  };

  if (!mounted) {
    return (
      <div className="w-full bg-transparent dark:bg-sidebar rounded-xl p-8 flex flex-col gap-y-6 sm:gap-y-4">
        <div className="lex items-center justify-between">
          {["light", "dark", "system"].map((label) => (
            <div
              key={label}
              className="w-20 h-8 rounded-lg bg-muted animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-transparent dark:bg-sidebar rounded-xl p-8 flex flex-col gap-y-6 sm:gap-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl sm:text-6xl font-caladea">Themes</h2>
      </div>

      <div className="flex flex-col gap-4 rounded-3xl border p-6">
        <h3 className="text-lg sm:text-2xl font-poppins">Color mode</h3>
        <div className="flex items-center justify-between sm:justify-evenly gap-4">
          {["light", "system", "dark"].map((label) => (
            <div key={label} className="text-center font-poppins text-lg">
              <Image
                src={themeImages[label]}
                alt={label}
                key={label}
                onClick={() => setTheme(label)}
                className="object-contain rounded-lg sm:rounded-2xl hover:scale-110 transition-transform duration-200 ease-in-out"
                width={265}
                height={136}
              ></Image>
              <p className="pt-2">
                {label.charAt(0).toUpperCase() + label.slice(1)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemesControl;
