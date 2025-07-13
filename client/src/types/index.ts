export interface UserData {
  id?: number;
  name: string;
  struggle: "discipline" | "consistency";
  habit: string;
  learned?: string;
  liked?: string;
  feedback?: string;
  completedWorkouts?: number;
  workoutDays?: string[];
  
  // New fields for additional features
  todos?: TodoItem[];
  journalEntries?: JournalEntry[];
  gratitudeEntries?: GratitudeEntry[];
  moodEntries?: MoodEntry[];
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  text: string;
  createdAt: string;
}

export interface GratitudeEntry {
  id: string;
  date: string;
  items: string[];
  createdAt: string;
}

export interface MoodEntry {
  id: string;
  date: string;
  mood: "happy" | "sad";
  createdAt: string;
}

export interface TimerState {
  timeRemaining: number;
  isRunning: boolean;
  isCompleted: boolean;
}

export interface CalendarDay {
  day: number;
  isCompleted: boolean;
  isCurrentMonth: boolean;
}
