"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { initializeFacebookParams, trackPixelEvent } from "@/utils/metaPixel";

function MetaPixelTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    initializeFacebookParams();
  }, []);

  useEffect(() => {
    trackPixelEvent("PageView");
  }, [pathname, searchParams]);

  return null;
}

export function MetaPixelTracker() {
  return (
    <Suspense fallback={null}>
      <MetaPixelTrackerInner />
    </Suspense>
  );
}


