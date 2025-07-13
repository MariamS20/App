import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { UserRound } from "lucide-react";
import { localStorageUtils } from "@/lib/storage";

export default function Welcome() {
  const [name, setName] = useState("");
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter your name to continue your mission!");
      return;
    }

    // Save name to local storage
    localStorageUtils.saveUserData({ name: name.trim(), struggle: "discipline", habit: "" });
    setLocation("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <div className="relative z-10 w-full max-w-4xl">
        <div className="text-center space-y-8">
          {/* Hero Section */}
          <div className="mb-12">
            <h2 className="font-orbitron text-5xl font-bold mb-4 text-primary animate-float">
              Welcome to DLMS
            </h2>
            <p className="text-xl text-gray-300 font-light">
              Your journey to stellar habits begins here
            </p>
          </div>

          {/* Form Card */}
          <Card className="glass-effect max-w-lg mx-auto border-0">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center">
                  <UserRound className="h-16 w-16 text-primary mb-4 mx-auto animate-float" />
                  <h3 className="font-orbitron text-2xl font-bold mb-2 text-white">
                    Mission Commander
                  </h3>
                  <p className="text-gray-300">
                    What should we call you on this cosmic journey?
                  </p>
                </div>

                <div className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Enter your name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="cosmic-input text-white placeholder-gray-400 font-medium"
                  />
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-pink-500 hover:from-pink-500 hover:to-primary rocket-btn font-orbitron font-bold text-lg shadow-lg hover:shadow-primary/50 transition-all duration-300"
                  >
                    Launch Mission
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
