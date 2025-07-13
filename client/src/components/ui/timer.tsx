import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TimerProps {
  initialTime?: number; // in seconds
  onComplete?: () => void;
}

export function Timer({ initialTime = 1200, onComplete }: TimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            onComplete?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeRemaining, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeRemaining(initialTime);
  };

  const progress = ((initialTime - timeRemaining) / initialTime) * 100;

  return (
    <div className="glass-effect rounded-xl p-6">
      <h3 className="font-orbitron text-2xl font-bold mb-6 text-primary text-center">
        Mission Timer
      </h3>
      <div className="text-center space-y-6">
        <div className="relative">
          <div className="w-48 h-48 mx-auto rounded-full border-8 border-primary/30 flex items-center justify-center glass-effect">
            <div className="text-center">
              <div className="font-orbitron text-4xl font-bold text-primary">
                {formatTime(timeRemaining)}
              </div>
              <div className="text-sm text-gray-400">minutes</div>
            </div>
          </div>
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(hsl(188, 100%, 50%) ${progress}%, transparent ${progress}%)`,
            }}
          />
        </div>
        <div className="flex justify-center space-x-4">
          <Button
            onClick={startTimer}
            disabled={isRunning || timeRemaining === 0}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
          >
            <Play className="mr-2 h-4 w-4" />
            Start
          </Button>
          <Button
            onClick={pauseTimer}
            disabled={!isRunning}
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700"
          >
            <Pause className="mr-2 h-4 w-4" />
            Pause
          </Button>
          <Button
            onClick={resetTimer}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
