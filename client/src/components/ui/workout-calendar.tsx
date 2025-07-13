import { useState } from "react";
import { Calendar } from "lucide-react";

interface WorkoutCalendarProps {
  completedDays: string[];
  onToggleDay: (day: string) => void;
}

export function WorkoutCalendar({ completedDays, onToggleDay }: WorkoutCalendarProps) {
  const [currentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(day);
    }

    return days;
  };

  const formatDay = (day: number) => {
    const month = currentMonth.getMonth() + 1;
    const year = currentMonth.getFullYear();
    return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
  };

  const isCompleted = (day: number) => {
    return completedDays.includes(formatDay(day));
  };

  const toggleDay = (day: number) => {
    const dayStr = formatDay(day);
    onToggleDay(dayStr);
  };

  const days = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleString("default", { month: "long", year: "numeric" });

  return (
    <div className="glass-effect rounded-xl p-6">
      <h3 className="font-orbitron text-2xl font-bold mb-6 text-primary text-center">
        <Calendar className="inline mr-2" />
        Mission Calendar
      </h3>
      <div className="space-y-4">
        <div className="text-center">
          <div className="font-orbitron text-lg font-bold text-white">{monthName}</div>
          <div className="text-sm text-gray-400">Mark your completed workouts</div>
        </div>
        
        <div className="grid grid-cols-7 gap-2 text-center">
          {/* Calendar Header */}
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="font-bold text-primary text-sm py-2">
              {day}
            </div>
          ))}
          
          {/* Calendar Days */}
          {days.map((day, index) => (
            <div key={index} className="w-8 h-8 flex items-center justify-center">
              {day ? (
                <button
                  onClick={() => toggleDay(day)}
                  className={`calendar-day w-8 h-8 rounded-full flex items-center justify-center cursor-pointer text-sm transition-all duration-300 hover:scale-110 ${
                    isCompleted(day)
                      ? "completed bg-gradient-to-r from-primary to-purple-500 text-white"
                      : "bg-gray-700 hover:bg-gray-600 text-white"
                  }`}
                >
                  {day}
                </button>
              ) : (
                <div className="w-8 h-8" />
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <div className="text-sm text-gray-400">
            <span className="text-primary font-bold">{completedDays.length}</span> / 12 workouts completed
          </div>
        </div>
      </div>
    </div>
  );
}
