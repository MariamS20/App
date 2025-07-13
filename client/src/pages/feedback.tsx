import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, MessageSquare, Send, RotateCcw } from "lucide-react";
import { localStorageUtils } from "@/lib/storage";

export default function Feedback() {
  const [feedback, setFeedback] = useState("");
  const [stats, setStats] = useState({
    days: 30,
    habits: 2,
    workouts: 0,
  });
  const [, setLocation] = useLocation();

  useEffect(() => {
    const userData = localStorageUtils.getUserData();
    if (!userData?.habit) {
      setLocation("/welcome");
      return;
    }
    
    // Calculate stats
    const workoutCount = userData.workoutDays?.length || 0;
    setStats({
      days: 30,
      habits: 2,
      workouts: workoutCount,
    });
  }, [setLocation]);

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feedback.trim()) {
      alert("Please share your feedback before submitting!");
      return;
    }

    // Save feedback
    localStorageUtils.updateUserData({
      feedback: feedback.trim(),
    });

    alert("Thank you for your feedback! Your input helps us improve DLMS for all space travelers.");
    setFeedback("");
  };

  const handleRestartJourney = () => {
    if (confirm("Are you sure you want to start a new journey? This will clear all your progress.")) {
      localStorageUtils.clearUserData();
      setLocation("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <div className="relative z-10 w-full max-w-2xl">
        <Card className="glass-effect border-0">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <Trophy className="h-16 w-16 text-primary mb-4 mx-auto animate-float" />
              <h2 className="font-orbitron text-3xl font-bold mb-4 text-primary">
                Mission Accomplished!
              </h2>
              <p className="text-xl text-gray-300 mb-6">
                Congratulations on completing your cosmic journey! Your dedication to
                building stellar habits is truly impressive.
              </p>

              {/* Achievement Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="glass-effect rounded-lg p-4">
                  <div className="text-2xl font-orbitron font-bold text-primary">
                    {stats.days}
                  </div>
                  <div className="text-sm text-gray-400">Days Tracked</div>
                </div>
                <div className="glass-effect rounded-lg p-4">
                  <div className="text-2xl font-orbitron font-bold text-primary">
                    {stats.habits}
                  </div>
                  <div className="text-sm text-gray-400">Habits Built</div>
                </div>
                <div className="glass-effect rounded-lg p-4">
                  <div className="text-2xl font-orbitron font-bold text-primary">
                    {stats.workouts}
                  </div>
                  <div className="text-sm text-gray-400">Workouts Done</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="text-left">
                <h3 className="font-orbitron text-xl font-bold mb-4 text-white flex items-center">
                  <MessageSquare className="text-primary mr-2" />
                  Help us improve DLMS
                </h3>
                <p className="text-gray-300 mb-4">
                  After completing your goals, please share your feedback and ideas to
                  improve DLMS!
                </p>
                <form onSubmit={handleSubmitFeedback} className="space-y-4">
                  <Textarea
                    placeholder="Share your experience, suggestions, or ideas for making DLMS even better..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="cosmic-input text-white placeholder-gray-400 resize-none min-h-[120px]"
                  />
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-primary to-purple-500 hover:from-purple-500 hover:to-primary rocket-btn font-orbitron font-bold text-lg shadow-lg hover:shadow-primary/50 transition-all duration-300"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send Feedback
                    </Button>
                    <Button
                      type="button"
                      onClick={handleRestartJourney}
                      className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 font-orbitron font-bold text-lg transition-all duration-300"
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Start New Journey
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
