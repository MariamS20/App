import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Lightbulb, Heart } from "lucide-react";
import { localStorageUtils } from "@/lib/storage";

export default function Reflection() {
  const [habit, setHabit] = useState("");
  const [learned, setLearned] = useState("");
  const [liked, setLiked] = useState("");
  const [, setLocation] = useLocation();

  useEffect(() => {
    const userData = localStorageUtils.getUserData();
    if (userData?.habit) {
      setHabit(userData.habit);
    } else {
      setLocation("/welcome");
    }
  }, [setLocation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!learned.trim() || !liked.trim()) {
      alert("Please complete both reflection questions!");
      return;
    }

    // Update user data
    localStorageUtils.updateUserData({
      learned: learned.trim(),
      liked: liked.trim(),
    });

    setLocation("/workout-timer");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <div className="relative z-10 w-full max-w-2xl">
        <Card className="glass-effect border-0">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <Star className="h-16 w-16 text-primary mb-4 mx-auto animate-float" />
              <h2 className="font-orbitron text-3xl font-bold mb-4 text-primary">
                Mission Reflection
              </h2>
              <p className="text-xl text-gray-300">
                Gotcha, let's help you with{" "}
                <span className="text-primary font-bold">{habit}</span>!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Question 1 */}
              <div className="text-left">
                <h3 className="font-orbitron text-xl font-bold mb-4 text-white flex items-center">
                  <Lightbulb className="text-primary mr-2" />
                  What did you learn?
                </h3>
                <Textarea
                  placeholder="Share your insights and discoveries..."
                  value={learned}
                  onChange={(e) => setLearned(e.target.value)}
                  className="cosmic-input text-white placeholder-gray-400 resize-none min-h-[120px]"
                />
              </div>

              {/* Question 2 */}
              <div className="text-left">
                <h3 className="font-orbitron text-xl font-bold mb-4 text-white flex items-center">
                  <Heart className="text-red-400 mr-2" />
                  What did you like about it?
                </h3>
                <Textarea
                  placeholder="What motivated and excited you..."
                  value={liked}
                  onChange={(e) => setLiked(e.target.value)}
                  className="cosmic-input text-white placeholder-gray-400 resize-none min-h-[120px]"
                />
              </div>

              <div className="text-center">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-primary to-purple-500 hover:from-purple-500 hover:to-primary rocket-btn font-orbitron font-bold text-lg shadow-lg hover:shadow-primary/50 transition-all duration-300 px-8 py-3"
                >
                  Continue Journey
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
