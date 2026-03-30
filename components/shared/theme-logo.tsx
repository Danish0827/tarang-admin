"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

import LogoDark from "@/public/assets/images/logo-light.svg";
import LogoWhite from "@/public/assets/images/logo.svg";
import { useSidebarCollapsed } from "@/hooks/useSidebarCollapsed";

function ThemeLogo() {
  const { theme } = useTheme();
  const isCollapsed = useSidebarCollapsed();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render until mounted to avoid hydration mismatch or wrong theme
  if (!isMounted) return null;

  return (
    <Link href="/dashboard">
      <Image
        src={theme === "dark" ? LogoWhite : LogoDark}
        alt="Logo"
        width={250}
        height={100}
        priority
      />
    </Link>
  );
}

export default ThemeLogo;
