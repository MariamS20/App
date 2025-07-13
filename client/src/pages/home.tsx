import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rocket, CheckSquare, BookOpen, Smile, Target, Star, Calendar, Flame, Trophy } from "lucide-react";
import { localStorageUtils } from "@/lib/storage";
import { UserData } from "@/types";

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const data = localStorageUtils.getUserData();
    if (!data?.name) {
      setLocation("/welcome");
      return;
    }
    setUserData(data);
  }, [setLocation]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const getStats = () => {
    if (!userData) return { todos: 0, journal: 0, gratitude: 0, moods: 0, streak: 0 };
    
    return {
      todos: userData.todos?.filter(t => t.completed).length || 0,
      journal: userData.journalEntries?.length || 0,
      gratitude: userData.gratitudeEntries?.length || 0,
      moods: userData.moodEntries?.length || 0,
      streak: calculateStreak(),
    };
  };

  const calculateStreak = () => {
    if (!userData) return 0;
    
    const today = new Date().toDateString();
    const activities = [
      ...(userData.todos?.filter(t => t.completed).map(t => t.createdAt) || []),
      ...(userData.journalEntries?.map(j => j.createdAt) || []),
      ...(userData.moodEntries?.map(m => m.createdAt) || []),
    ];
    
    const uniqueDates = [...new Set(activities.map(date => new Date(date).toDateString()))];
    const sortedDates = uniqueDates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    
    let streak = 0;
    const today_date = new Date().toDateString();
    
    for (let i = 0; i < sortedDates.length; i++) {
      const expectedDate = new Date();
      expectedDate.setDate(expectedDate.getDate() - i);
      
      if (sortedDates[i] === expectedDate.toDateString()) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const getCalendarDays = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toDateString();
      
      const hasActivity = userData && [
        ...(userData.todos?.filter(t => t.completed).map(t => new Date(t.createdAt).toDateString()) || []),
        ...(userData.journalEntries?.map(j => new Date(j.createdAt).toDateString()) || []),
        ...(userData.moodEntries?.map(m => new Date(m.createdAt).toDateString()) || []),
      ].includes(dateString);
      
      days.push({
        day,
        date: dateString,
        hasActivity,
        isToday: dateString === today.toDateString(),
      });
    }
    
    return days;
  };

  const calendarDays = getCalendarDays();

  const stats = getStats();

  const quickActions = [
    {
      title: "To-Do List",
      description: "Manage your daily tasks",
      icon: CheckSquare,
      path: "/todo",
      color: "from-blue-500 to-purple-500",
      stat: `${stats.todos} completed`,
    },
    {
      title: "Journal",
      description: "Reflect and be grateful",
      icon: BookOpen,
      path: "/journal",
      color: "from-green-500 to-teal-500",
      stat: `${stats.journal} entries`,
    },
    {
      title: "Mood Tracker",
      description: "Track your feelings",
      icon: Smile,
      path: "/mood",
      color: "from-yellow-500 to-orange-500",
      stat: `${stats.moods} logged`,
    },
    {
      title: "Habit Tracker",
      description: "Build lasting habits",
      icon: Target,
      path: "/habit-tracker",
      color: "from-purple-500 to-pink-500",
      stat: userData?.habit ? "Active" : "Not started",
    },
  ];

  return (
    <div className="min-h-screen px-4 py-8 relative">
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Rocket className="h-20 w-20 text-primary mb-6 mx-auto animate-float" />
          <h1 className="font-orbitron text-4xl md:text-6xl font-bold mb-4 text-primary">
            DLMS
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-6">
            {getGreeting()}, {userData?.name || "Space Explorer"}!
          </p>
          <div className="text-lg text-gray-400">
            Your personal command center for habits, productivity, and well-being
          </div>
        </div>

        {/* Streak Tracker */}
        <Card className="glass-effect border-0 mb-8">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Flame className="h-8 w-8 text-orange-500" />
              <CardTitle className="text-2xl text-white">Current Streak</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-6xl font-orbitron font-bold text-primary mb-4">
              {stats.streak}
            </div>
            <div className="text-lg text-gray-300 mb-4">
              {stats.streak === 1 ? "Day" : "Days"} of consistent activity
            </div>
            <div className="flex justify-center gap-4">
              <div className="text-center">
                <Trophy className="h-6 w-6 text-yellow-500 mx-auto mb-1" />
                <div className="text-sm text-gray-400">Personal Best</div>
                <div className="text-lg font-bold text-primary">{stats.streak}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calendar Section */}
        <Card className="glass-effect border-0 mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white mb-4">
              Today is a good day, let's make it even better
            </CardTitle>
            <div className="flex items-center justify-center gap-2">
              <Calendar className="h-6 w-6 text-primary" />
              <span className="text-lg text-gray-300">
                {new Date().toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-gray-400 p-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={`
                    aspect-square flex items-center justify-center text-sm rounded-lg
                    ${day === null ? '' : 
                      day.isToday 
                        ? 'bg-primary text-white font-bold border-2 border-primary' 
                        : day.hasActivity 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                          : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
                    }
                  `}
                >
                  {day?.day}
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-6 mt-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-gray-400">Today</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-400">Active Day</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
                <span className="text-gray-400">Inactive Day</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        {userData && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <Card className="glass-effect border-0">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-orbitron font-bold text-primary">
                  {stats.todos}
                </div>
                <div className="text-sm text-gray-400">Tasks Done</div>
              </CardContent>
            </Card>
            <Card className="glass-effect border-0">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-orbitron font-bold text-primary">
                  {stats.journal}
                </div>
                <div className="text-sm text-gray-400">Journal Entries</div>
              </CardContent>
            </Card>
            <Card className="glass-effect border-0">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-orbitron font-bold text-primary">
                  {stats.gratitude}
                </div>
                <div className="text-sm text-gray-400">Gratitude Logs</div>
              </CardContent>
            </Card>
            <Card className="glass-effect border-0">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-orbitron font-bold text-primary">
                  {stats.moods}
                </div>
                <div className="text-sm text-gray-400">Mood Checks</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Getting Started */}
        {!userData && (
          <div className="text-center mt-12">
            <Card className="glass-effect border-0">
              <CardContent className="p-8">
                <Rocket className="h-16 w-16 text-primary mb-4 mx-auto animate-float" />
                <h2 className="font-orbitron text-2xl font-bold mb-4 text-primary">
                  Ready to Start Your Journey?
                </h2>
                <p className="text-gray-300 mb-6">
                  Begin by setting up your habits and tracking your progress
                </p>
                <Button
                  onClick={() => setLocation("/habit-tracker")}
                  className="bg-gradient-to-r from-primary to-purple-500 hover:from-purple-500 hover:to-primary rocket-btn font-orbitron font-bold text-lg"
                >
                  Launch Mission
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}