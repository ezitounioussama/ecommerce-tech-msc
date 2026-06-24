"use client";

import { Toaster as HotToaster } from "react-hot-toast";

export function Toaster() {
  return (
    <HotToaster
      position="top-right"
      gutter={12}
      containerStyle={{ margin: 0, padding: 0 }}
      toastOptions={{
        duration: 4000,
      }}
    />
  );
}
