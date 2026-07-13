"use client";

import { ReactNode } from "react";
import { I18nProvider } from "@/lib/i18n";
import SmoothScroll from "@/components/SmoothScroll";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <SmoothScroll>{children}</SmoothScroll>
    </I18nProvider>
  );
}
