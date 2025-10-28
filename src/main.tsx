import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./components/providers/ThemeProvider.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <TooltipProvider delayDuration={0}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>
);
