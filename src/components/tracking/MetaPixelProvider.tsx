"use client";

import { ReactNode } from "react";
import { MetaPixelScript } from "./MetaPixelScript";
import { MetaPixelTracker } from "./MetaPixelTracker";
import { isMetaPixelConfigured } from "@/utils/metaPixel";

interface MetaPixelProviderProps {
  children: ReactNode;
  testEventCode?: string;
}

export function MetaPixelProvider({ children, testEventCode }: MetaPixelProviderProps) {
  if (!isMetaPixelConfigured()) {
    return <>{children}</>;
  }

  return (
    <>
      <MetaPixelScript testEventCode={testEventCode} />
      <MetaPixelTracker />
      {children}
    </>
  );
}


