import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SpaceBackground } from "@/components/space-background";
import { ProgressHeader } from "@/components/progress-header";
import { Navigation } from "@/components/navigation";
import { useLocation } from "wouter";
import Home from "@/pages/home";
import Welcome from "@/pages/welcome";
import HabitTracker from "@/pages/habit-tracker";
import Reflection from "@/pages/reflection";
import WorkoutTimer from "@/pages/workout-timer";
import Feedback from "@/pages/feedback";
import Todo from "@/pages/todo";
import Journal from "@/pages/journal";
import Mood from "@/pages/mood";
import BreakTime from "@/pages/break-time";
import AboutMe from "@/pages/about-me";
import NotFound from "@/pages/not-found";

function Router() {
  const [location] = useLocation();
  
  // Determine current page number for progress indicator
  const getCurrentPage = () => {
    switch (location) {
      case "/welcome":
        return 1;
      case "/habit-tracker":
        return 2;
      case "/reflection":
        return 3;
      case "/workout-timer":
        return 4;
      case "/feedback":
        return 5;
      default:
        return 0; // For main app pages (home, todo, journal, mood)
    }
  };

  const showProgressHeader = () => {
    const habitPages = ["/welcome", "/habit-tracker", "/reflection", "/workout-timer", "/feedback"];
    return habitPages.includes(location);
  };

  const showNavigation = location !== "/welcome";

  return (
    <div className="min-h-screen relative">
      <SpaceBackground />
      {showProgressHeader() && <ProgressHeader currentPage={getCurrentPage()} />}
      {showNavigation && <Navigation />}
      <main className={`${showProgressHeader() ? "pt-16" : showNavigation ? "pt-16" : "pt-0"}`}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/welcome" component={Welcome} />
          <Route path="/habit-tracker" component={HabitTracker} />
          <Route path="/reflection" component={Reflection} />
          <Route path="/workout-timer" component={WorkoutTimer} />
          <Route path="/feedback" component={Feedback} />
          <Route path="/todo" component={Todo} />
          <Route path="/journal" component={Journal} />
          <Route path="/mood" component={Mood} />
          <Route path="/break-time" component={BreakTime} />
          <Route path="/about-me" component={AboutMe} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="dark">
          <Toaster />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
