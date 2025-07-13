import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Satellite, Zap, RotateCcw, Target } from "lucide-react";
import { localStorageUtils } from "@/lib/storage";

export default function HabitTracker() {
  const [userName, setUserName] = useState("");
  const [selectedStruggle, setSelectedStruggle] = useState<"discipline" | "consistency" | "">("");
  const [habit, setHabit] = useState("");
  const [, setLocation] = useLocation();

  useEffect(() => {
    const userData = localStorageUtils.getUserData();
    if (userData?.name) {
      setUserName(userData.name);
    } else {
      setLocation("/welcome");
    }
  }, [setLocation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedStruggle) {
      alert("Please select what you're struggling with!");
      return;
    }
    
    if (!habit.trim()) {
      alert("Please enter the habit you want to start!");
      return;
    }

    // Update user data
    localStorageUtils.updateUserData({
      struggle: selectedStruggle,
      habit: habit.trim(),
    });

    setLocation("/reflection");
  };

  const selectStruggle = (struggle: "discipline" | "consistency") => {
    setSelectedStruggle(struggle);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <div className="relative z-10 w-full max-w-2xl">
        <Card className="glass-effect border-0">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="font-orbitron text-3xl font-bold mb-4 text-primary">
                Welcome, {userName}!
              </h2>
              <p className="text-xl text-gray-300">
                Happy to have you here! Let's chart your course to success.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Struggle Assessment */}
              <div className="text-left">
                <h3 className="font-orbitron text-xl font-bold mb-4 text-white flex items-center">
                  <Satellite className="text-primary mr-2" />
                  What are you struggling with?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => selectStruggle("discipline")}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                      selectedStruggle === "discipline"
                        ? "border-primary bg-primary/10"
                        : "border-gray-600 hover:border-primary"
                    }`}
                  >
                    <Zap className="text-red-400 text-2xl mb-2" />
                    <div className="font-bold text-white">Discipline</div>
                    <div className="text-sm text-gray-400">
                      Staying focused and committed
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => selectStruggle("consistency")}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                      selectedStruggle === "consistency"
                        ? "border-primary bg-primary/10"
                        : "border-gray-600 hover:border-primary"
                    }`}
                  >
                    <RotateCcw className="text-purple-400 text-2xl mb-2" />
                    <div className="font-bold text-white">Consistency</div>
                    <div className="text-sm text-gray-400">
                      Maintaining regular habits
                    </div>
                  </button>
                </div>
              </div>

              {/* Habit Input */}
              <div className="text-left">
                <h3 className="font-orbitron text-xl font-bold mb-4 text-white flex items-center">
                  <Target className="text-primary mr-2" />
                  What habit do you want to start?
                </h3>
                <Input
                  type="text"
                  placeholder="e.g., Read for 30 minutes daily, Exercise 3 times a week..."
                  value={habit}
                  onChange={(e) => setHabit(e.target.value)}
                  className="cosmic-input text-white placeholder-gray-400"
                />
              </div>

              <div className="text-center">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-primary to-purple-500 hover:from-purple-500 hover:to-primary rocket-btn font-orbitron font-bold text-lg shadow-lg hover:shadow-primary/50 transition-all duration-300 px-8 py-3"
                >
                  Set Course
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
