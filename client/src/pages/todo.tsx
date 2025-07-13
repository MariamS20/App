import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { CheckSquare, Plus, Trash2, Check } from "lucide-react";
import { localStorageUtils } from "@/lib/storage";
import { TodoItem } from "@/types";
import confetti from "canvas-confetti";

export default function Todo() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const userData = localStorageUtils.getUserData();
    if (userData?.todos) {
      setTodos(userData.todos);
    }
  }, []);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const todo: TodoItem = {
      id: Date.now().toString(),
      text: newTodo.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    const updatedTodos = [...todos, todo];
    setTodos(updatedTodos);
    localStorageUtils.updateUserData({ todos: updatedTodos });
    setNewTodo("");
  };

  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    localStorageUtils.updateUserData({ todos: updatedTodos });
    
    // Check if all todos are completed and trigger confetti
    const allCompleted = updatedTodos.length > 0 && updatedTodos.every(todo => todo.completed);
    if (allCompleted) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    localStorageUtils.updateUserData({ todos: updatedTodos });
  };

  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="min-h-screen px-4 py-8 relative">
      <div className="relative z-10 max-w-2xl mx-auto">
        <Card className="glass-effect border-0">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <CheckSquare className="h-16 w-16 text-primary mb-4 mx-auto animate-float" />
              <h2 className="font-orbitron text-3xl font-bold mb-4 text-primary">
                Mission Tasks
              </h2>
              <p className="text-xl text-gray-300">
                Track your daily objectives and conquer your goals
              </p>
              <div className="mt-4 text-primary font-orbitron">
                {completedCount} / {todos.length} tasks completed
              </div>
            </div>

            <form onSubmit={addTodo} className="flex gap-2 mb-6">
              <Input
                type="text"
                placeholder="Add a new task..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                className="cosmic-input text-white placeholder-gray-400 flex-1"
              />
              <Button
                type="submit"
                className="bg-gradient-to-r from-primary to-pink-500 hover:from-pink-500 hover:to-primary shadow-lg"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </form>

            <div className="space-y-3">
              {todos.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  No tasks yet. Add one above to get started!
                </div>
              ) : (
                todos.map((todo) => (
                  <div
                    key={todo.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 ${
                      todo.completed
                        ? "bg-green-500/10 border-green-500/30"
                        : "bg-white/5 border-white/20"
                    }`}
                  >
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className={`p-2 rounded-full transition-all duration-300 ${
                        todo.completed
                          ? "bg-green-500 text-white"
                          : "bg-gray-700 hover:bg-gray-600"
                      }`}
                    >
                      {todo.completed ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <div className="h-4 w-4" />
                      )}
                    </button>
                    <span
                      className={`flex-1 transition-all duration-300 ${
                        todo.completed
                          ? "text-green-300 line-through"
                          : "text-white"
                      }`}
                    >
                      {todo.text}
                    </span>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-full transition-all duration-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}