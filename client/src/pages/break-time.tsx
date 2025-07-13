import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gamepad2, Play, Pause, RotateCcw } from "lucide-react";

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Position = { x: number; y: number };

const BOARD_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 15, y: 15 };
const INITIAL_DIRECTION = "RIGHT";

export default function BreakTime() {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>(INITIAL_FOOD);
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [gameRunning, setGameRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem("snakeHighScore");
    return saved ? parseInt(saved) : 0;
  });

  const generateFood = useCallback(() => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, [snake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection(INITIAL_DIRECTION);
    setGameRunning(false);
    setGameOver(false);
    setScore(0);
  };

  const moveSnake = useCallback(() => {
    if (!gameRunning || gameOver) return;

    setSnake(currentSnake => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };

      switch (direction) {
        case "UP":
          head.y -= 1;
          break;
        case "DOWN":
          head.y += 1;
          break;
        case "LEFT":
          head.x -= 1;
          break;
        case "RIGHT":
          head.x += 1;
          break;
      }

      // Check wall collision
      if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
        setGameOver(true);
        setGameRunning(false);
        return currentSnake;
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        setGameRunning(false);
        return currentSnake;
      }

      newSnake.unshift(head);

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, gameRunning, gameOver, food, generateFood]);

  useEffect(() => {
    const interval = setInterval(moveSnake, 150);
    return () => clearInterval(interval);
  }, [moveSnake]);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("snakeHighScore", score.toString());
    }
  }, [score, highScore]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameRunning) return;

      switch (e.key) {
        case "ArrowUp":
          if (direction !== "DOWN") setDirection("UP");
          break;
        case "ArrowDown":
          if (direction !== "UP") setDirection("DOWN");
          break;
        case "ArrowLeft":
          if (direction !== "RIGHT") setDirection("LEFT");
          break;
        case "ArrowRight":
          if (direction !== "LEFT") setDirection("RIGHT");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction, gameRunning]);

  const toggleGame = () => {
    if (gameOver) {
      resetGame();
    } else {
      setGameRunning(!gameRunning);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 relative">
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Gamepad2 className="h-16 w-16 text-primary mb-4 mx-auto animate-bounce" />
          <h1 className="text-4xl font-bold text-white mb-2">Break Time</h1>
          <p className="text-gray-300">Take a break and play some Snake!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Game Board */}
          <Card className="glass-effect border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-white">Snake Game</CardTitle>
              <div className="flex justify-center gap-4 text-sm">
                <span className="text-gray-300">Score: {score}</span>
                <span className="text-gray-300">High Score: {highScore}</span>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <div 
                className="grid bg-gray-900 border-2 border-gray-700 rounded-lg p-2"
                style={{ 
                  gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
                  gridTemplateRows: `repeat(${BOARD_SIZE}, 1fr)`,
                  width: '400px',
                  height: '400px'
                }}
              >
                {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, index) => {
                  const x = index % BOARD_SIZE;
                  const y = Math.floor(index / BOARD_SIZE);
                  const isSnake = snake.some(segment => segment.x === x && segment.y === y);
                  const isFood = food.x === x && food.y === y;
                  const isHead = snake[0] && snake[0].x === x && snake[0].y === y;

                  return (
                    <div
                      key={index}
                      className={`border border-gray-800 ${
                        isSnake
                          ? isHead
                            ? "bg-primary"
                            : "bg-primary/80"
                          : isFood
                          ? "bg-red-500"
                          : "bg-gray-900"
                      }`}
                    />
                  );
                })}
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={toggleGame}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  {gameOver ? (
                    <>
                      <RotateCcw className="h-4 w-4 mr-2" />
                      New Game
                    </>
                  ) : gameRunning ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Start
                    </>
                  )}
                </Button>
                <Button
                  onClick={resetGame}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>

              {gameOver && (
                <div className="text-center text-red-400 font-semibold">
                  Game Over! Final Score: {score}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card className="glass-effect border-0">
            <CardHeader>
              <CardTitle className="text-white">How to Play</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-primary">Controls</h3>
                <ul className="text-gray-300 space-y-1">
                  <li>• Use arrow keys to move</li>
                  <li>• Click Start/Pause to control game</li>
                  <li>• Click Reset to restart</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-primary">Rules</h3>
                <ul className="text-gray-300 space-y-1">
                  <li>• Eat the red food to grow</li>
                  <li>• Don't hit the walls</li>
                  <li>• Don't hit yourself</li>
                  <li>• Each food gives 10 points</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-primary">Tips</h3>
                <ul className="text-gray-300 space-y-1">
                  <li>• Plan your moves ahead</li>
                  <li>• Don't get trapped in corners</li>
                  <li>• Stay calm and focused</li>
                  <li>• Take breaks when needed</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}