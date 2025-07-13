import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Save, Heart, Star } from "lucide-react";
import { localStorageUtils } from "@/lib/storage";
import { JournalEntry, GratitudeEntry } from "@/types";

export default function Journal() {
  const [journalText, setJournalText] = useState("");
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [gratitudeItems, setGratitudeItems] = useState<string[]>(["", "", "", "", ""]);
  const [gratitudeEntries, setGratitudeEntries] = useState<GratitudeEntry[]>([]);

  useEffect(() => {
    const userData = localStorageUtils.getUserData();
    if (userData?.journalEntries) {
      setJournalEntries(userData.journalEntries);
    }
    if (userData?.gratitudeEntries) {
      setGratitudeEntries(userData.gratitudeEntries);
    }
  }, []);

  const saveJournalEntry = () => {
    if (!journalText.trim()) return;

    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      text: journalText.trim(),
      createdAt: new Date().toISOString(),
    };

    const updatedEntries = [entry, ...journalEntries];
    setJournalEntries(updatedEntries);
    localStorageUtils.updateUserData({ journalEntries: updatedEntries });
    setJournalText("");
  };

  const saveGratitudeEntry = () => {
    const filledItems = gratitudeItems.filter(item => item.trim());
    if (filledItems.length === 0) return;

    const entry: GratitudeEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      items: filledItems,
      createdAt: new Date().toISOString(),
    };

    const updatedEntries = [entry, ...gratitudeEntries];
    setGratitudeEntries(updatedEntries);
    localStorageUtils.updateUserData({ gratitudeEntries: updatedEntries });
    setGratitudeItems(["", "", "", "", ""]);
  };

  const updateGratitudeItem = (index: number, value: string) => {
    const newItems = [...gratitudeItems];
    newItems[index] = value;
    setGratitudeItems(newItems);
  };

  return (
    <div className="min-h-screen px-4 py-8 relative">
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <BookOpen className="h-16 w-16 text-primary mb-4 mx-auto animate-float" />
          <h2 className="font-orbitron text-3xl font-bold mb-4 text-primary">
            Journal & Gratitude
          </h2>
          <p className="text-xl text-gray-300">
            Reflect on your journey and celebrate life's blessings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Journal Section */}
          <Card className="glass-effect border-0">
            <CardContent className="p-6">
              <h3 className="font-orbitron text-xl font-bold mb-4 text-white flex items-center">
                <BookOpen className="text-primary mr-2" />
                Daily Learning
              </h3>
              <p className="text-gray-300 mb-4">What did you learn today?</p>
              
              <Textarea
                placeholder="Share your insights, discoveries, and reflections..."
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
                className="cosmic-input text-white placeholder-gray-400 resize-none min-h-[120px] mb-4"
              />
              
              <Button
                onClick={saveJournalEntry}
                disabled={!journalText.trim()}
                className="w-full bg-gradient-to-r from-primary to-blue-500 hover:from-blue-500 hover:to-primary shadow-lg"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Entry
              </Button>

              {/* Recent Journal Entries */}
              <div className="mt-6 space-y-3">
                {journalEntries.slice(0, 3).map((entry) => (
                  <div key={entry.id} className="bg-white/5 p-3 rounded-lg border border-white/10">
                    <div className="text-xs text-gray-400 mb-1">{entry.date}</div>
                    <div className="text-white text-sm">{entry.text}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Gratitude Section */}
          <Card className="glass-effect border-0">
            <CardContent className="p-6">
              <h3 className="font-orbitron text-xl font-bold mb-4 text-white flex items-center">
                <Heart className="text-red-400 mr-2" />
                Gratitude Log
              </h3>
              <p className="text-gray-300 mb-4">List 5 things you're grateful for today:</p>
              
              <div className="space-y-3 mb-4">
                {gratitudeItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder={`Gratitude ${index + 1}...`}
                      value={item}
                      onChange={(e) => updateGratitudeItem(index, e.target.value)}
                      className="cosmic-input text-white placeholder-gray-400 flex-1"
                    />
                  </div>
                ))}
              </div>
              
              <Button
                onClick={saveGratitudeEntry}
                disabled={!gratitudeItems.some(item => item.trim())}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-orange-500 hover:to-yellow-500"
              >
                <Heart className="mr-2 h-4 w-4" />
                Save Gratitude
              </Button>

              {/* Recent Gratitude Entries */}
              <div className="mt-6 space-y-3">
                {gratitudeEntries.slice(0, 2).map((entry) => (
                  <div key={entry.id} className="bg-white/5 p-3 rounded-lg border border-white/10">
                    <div className="text-xs text-gray-400 mb-2">{entry.date}</div>
                    <div className="space-y-1">
                      {entry.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <Star className="h-3 w-3 text-yellow-400" />
                          <span className="text-white">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}