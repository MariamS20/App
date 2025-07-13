import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dumbbell } from "lucide-react";
import { Timer } from "@/components/ui/timer";
import { WorkoutCalendar } from "@/components/ui/workout-calendar";
import { localStorageUtils } from "@/lib/storage";

export default function WorkoutTimer() {
  const [completedWorkouts, setCompletedWorkouts] = useState<string[]>([]);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const userData = localStorageUtils.getUserData();
    if (!userData?.habit) {
      setLocation("/welcome");
      return;
    }
    
    // Load completed workouts
    if (userData.workoutDays) {
      setCompletedWorkouts(userData.workoutDays);
    }
  }, [setLocation]);

  const handleTimerComplete = () => {
    alert("🎉 Workout complete! Great job, space cadet!");
  };

  const handleToggleWorkoutDay = (day: string) => {
    const updatedDays = completedWorkouts.includes(day)
      ? completedWorkouts.filter(d => d !== day)
      : [...completedWorkouts, day];
    
    setCompletedWorkouts(updatedDays);
    localStorageUtils.updateUserData({
      workoutDays: updatedDays,
      completedWorkouts: updatedDays.length,
    });
  };

  const handleContinue = () => {
    setLocation("/feedback");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <div className="relative z-10 w-full max-w-4xl">
        <Card className="glass-effect border-0">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <Dumbbell className="h-16 w-16 text-primary mb-4 mx-auto animate-float" />
              <h2 className="font-orbitron text-3xl font-bold mb-4 text-primary">
                Bonus Mission
              </h2>
              <p className="text-xl text-gray-300 mb-6">
                Ready for a challenge? Let's add a fitness habit to your routine!
              </p>
              <div className="bg-gradient-to-r from-purple-500 to-primary p-4 rounded-lg">
                <h3 className="font-orbitron text-xl font-bold text-white">
                  Workout for 20 minutes, 3 times a week for 1 month
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Timer Section */}
              <Timer initialTime={1200} onComplete={handleTimerComplete} />

              {/* Calendar Section */}
              <WorkoutCalendar
                completedDays={completedWorkouts}
                onToggleDay={handleToggleWorkoutDay}
              />
            </div>

            <div className="text-center mt-8">
              <Button
                onClick={handleContinue}
                className="bg-gradient-to-r from-primary to-purple-500 hover:from-purple-500 hover:to-primary rocket-btn font-orbitron font-bold text-lg shadow-lg hover:shadow-primary/50 transition-all duration-300 px-8 py-3"
              >
                Mission Complete
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
