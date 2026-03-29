import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Footer } from "./components/Footer";
import { NavBar } from "./components/NavBar";
import { OceanBackground } from "./components/OceanBackground";
import { BreathingPage } from "./pages/BreathingPage";
import { HomePage } from "./pages/HomePage";
import { MeditationPage } from "./pages/MeditationPage";
import { MoodPage } from "./pages/MoodPage";
import { ProgressPage } from "./pages/ProgressPage";

function RootLayout() {
  return (
    <div className="relative min-h-screen">
      <OceanBackground />
      <div className="relative z-10 flex flex-col min-h-screen">
        <NavBar />
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>
      <Toaster />
    </div>
  );
}

const rootRoute = createRootRoute({ component: RootLayout });

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <PageWrapper>
      <HomePage />
    </PageWrapper>
  ),
});
const meditationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/meditation",
  component: () => (
    <PageWrapper>
      <MeditationPage />
    </PageWrapper>
  ),
});
const breathingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/breathing",
  component: () => (
    <PageWrapper>
      <BreathingPage />
    </PageWrapper>
  ),
});
const moodRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/mood",
  component: () => (
    <PageWrapper>
      <MoodPage />
    </PageWrapper>
  ),
});
const progressRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/progress",
  component: () => (
    <PageWrapper>
      <ProgressPage />
    </PageWrapper>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  meditationRoute,
  breathingRoute,
  moodRoute,
  progressRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
