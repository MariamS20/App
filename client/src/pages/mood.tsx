import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Smile, Frown, Heart, Star } from "lucide-react";
import { localStorageUtils } from "@/lib/storage";
import { MoodEntry } from "@/types";

export default function Mood() {
  const [selectedMood, setSelectedMood] = useState<"happy" | "sad" | "">("");
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const userData = localStorageUtils.getUserData();
    if (userData?.moodEntries) {
      setMoodEntries(userData.moodEntries);
    }
  }, []);

  const handleMoodSelection = (mood: "happy" | "sad") => {
    setSelectedMood(mood);
    setShowMessage(true);

    const entry: MoodEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      mood,
      createdAt: new Date().toISOString(),
    };

    const updatedEntries = [entry, ...moodEntries];
    setMoodEntries(updatedEntries);
    localStorageUtils.updateUserData({ moodEntries: updatedEntries });
  };

  const resetMood = () => {
    setSelectedMood("");
    setShowMessage(false);
  };

  const getMoodMessage = () => {
    if (selectedMood === "happy") {
      return "Keep smiling, great things are coming your way!";
    } else if (selectedMood === "sad") {
      return "It's okay, bad days are a part of life.";
    }
    return "";
  };

  const getMoodStats = () => {
    const recentEntries = moodEntries.slice(0, 7);
    const happyCount = recentEntries.filter(entry => entry.mood === "happy").length;
    const sadCount = recentEntries.filter(entry => entry.mood === "sad").length;
    return { happyCount, sadCount, total: recentEntries.length };
  };

  const stats = getMoodStats();

  return (
    <div className="min-h-screen px-4 py-8 relative">
      <div className="relative z-10 max-w-2xl mx-auto">
        <Card className="glass-effect border-0">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <Smile className="h-16 w-16 text-primary mb-4 mx-auto animate-float" />
              <h2 className="font-orbitron text-3xl font-bold mb-4 text-primary">
                Mood Tracker
              </h2>
              <p className="text-xl text-gray-300">
                How are you feeling today?
              </p>
            </div>

            {!showMessage ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <button
                    onClick={() => handleMoodSelection("happy")}
                    className="p-8 rounded-xl border-2 border-gray-600 hover:border-green-400 transition-all duration-300 bg-white/5 hover:bg-green-400/10 group"
                  >
                    <Smile className="h-16 w-16 text-green-400 mb-4 mx-auto group-hover:scale-110 transition-transform duration-300" />
                    <div className="font-orbitron text-2xl font-bold text-white mb-2">Happy</div>
                    <div className="text-gray-300">Feeling good and positive</div>
                  </button>

                  <button
                    onClick={() => handleMoodSelection("sad")}
                    className="p-8 rounded-xl border-2 border-gray-600 hover:border-blue-400 transition-all duration-300 bg-white/5 hover:bg-blue-400/10 group"
                  >
                    <Frown className="h-16 w-16 text-blue-400 mb-4 mx-auto group-hover:scale-110 transition-transform duration-300" />
                    <div className="font-orbitron text-2xl font-bold text-white mb-2">Sad</div>
                    <div className="text-gray-300">Feeling down or upset</div>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-6">
                <div className={`p-6 rounded-xl ${selectedMood === "happy" ? "bg-green-400/10 border-2 border-green-400" : "bg-blue-400/10 border-2 border-blue-400"}`}>
                  {selectedMood === "happy" ? (
                    <div className="space-y-4">
                      <Star className="h-12 w-12 text-yellow-400 mx-auto animate-pulse" />
                      <div className="font-orbitron text-xl font-bold text-green-400">
                        {getMoodMessage()}
                      </div>
                      <div className="text-gray-300">
                        Your positive energy is inspiring! Keep spreading those good vibes.
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Heart className="h-12 w-12 text-pink-400 mx-auto animate-pulse" />
                      <div className="font-orbitron text-xl font-bold text-blue-400">
                        {getMoodMessage()}
                      </div>
                      <div className="text-gray-300">
                        Remember, you're stronger than you know. Tomorrow is a new day.
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  onClick={resetMood}
                  className="bg-gradient-to-r from-primary to-pink-500 hover:from-pink-500 hover:to-primary shadow-lg"
                >
                  Track Another Day
                </Button>
              </div>
            )}

            {/* Mood Statistics */}
            {stats.total > 0 && (
              <div className="mt-8 p-6 bg-white/5 rounded-xl border border-white/10">
                <h3 className="font-orbitron text-lg font-bold text-white mb-4 text-center">
                  Your Mood Journey (Last 7 Days)
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-orbitron font-bold text-green-400">
                      {stats.happyCount}
                    </div>
                    <div className="text-sm text-gray-400">Happy Days</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-orbitron font-bold text-blue-400">
                      {stats.sadCount}
                    </div>
                    <div className="text-sm text-gray-400">Sad Days</div>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Entries */}
            {moodEntries.length > 0 && (
              <div className="mt-6 space-y-2">
                <h4 className="font-orbitron text-md font-bold text-gray-300 text-center">
                  Recent Moods
                </h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {moodEntries.slice(0, 10).map((entry) => (
                    <div
                      key={entry.id}
                      className={`px-3 py-1 rounded-full text-xs ${
                        entry.mood === "happy"
                          ? "bg-green-400/20 text-green-400"
                          : "bg-blue-400/20 text-blue-400"
                      }`}
                    >
                      {entry.mood === "happy" ? "😊" : "😢"} {entry.date}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}