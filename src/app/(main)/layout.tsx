"use client";
import {useUserStore} from "@/stores/modules/user/store";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useEffect} from "react";

const queryClient = new QueryClient();

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const savePendingRoll = () => {
    console.log("savePendingRoll");
    const state = useUserStore.getState();
    if (state.pendingRollResult) {
      state.applyPendingRollResult();
    }
  };
  useEffect(() => {
    window.addEventListener("beforeunload", savePendingRoll);
    return () => window.removeEventListener("beforeunload", savePendingRoll);
  }, []);
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
