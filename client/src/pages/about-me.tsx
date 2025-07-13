import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Save, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AboutMeData {
  name: string;
  age: string;
  goals: string;
}

export default function AboutMe() {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState<AboutMeData>({
    name: "",
    age: "",
    goals: ""
  });
  const { toast } = useToast();

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("aboutMeData");
    if (savedData) {
      setData(JSON.parse(savedData));
    } else {
      // Try to get name from existing user data
      const userData = localStorage.getItem("userData");
      if (userData) {
        const parsed = JSON.parse(userData);
        setData(prev => ({ ...prev, name: parsed.name || "" }));
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("aboutMeData", JSON.stringify(data));
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your information has been saved successfully!",
    });
  };

  const handleInputChange = (field: keyof AboutMeData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const motivationalQuote = "The future isn't dictated by your circumstances but by the decisions you make";

  return (
    <div className="min-h-screen px-4 py-8 relative">
      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <User className="h-16 w-16 text-primary mb-4 mx-auto animate-pulse" />
          <h1 className="text-4xl font-bold text-white mb-2">About Me</h1>
          <p className="text-gray-300">Your personal space for self-reflection</p>
        </div>

        <Card className="glass-effect border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-white">My Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300">Name</Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={data.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="bg-gray-900/50 border-gray-700 text-white"
                  placeholder="Enter your name"
                />
              ) : (
                <div className="p-3 bg-gray-900/30 rounded-lg border border-gray-700 text-white">
                  {data.name || "Not set"}
                </div>
              )}
            </div>

            {/* Age Field */}
            <div className="space-y-2">
              <Label htmlFor="age" className="text-gray-300">Age</Label>
              {isEditing ? (
                <Input
                  id="age"
                  type="number"
                  value={data.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  className="bg-gray-900/50 border-gray-700 text-white"
                  placeholder="Enter your age"
                />
              ) : (
                <div className="p-3 bg-gray-900/30 rounded-lg border border-gray-700 text-white">
                  {data.age || "Not set"}
                </div>
              )}
            </div>

            {/* Goals Field */}
            <div className="space-y-2">
              <Label htmlFor="goals" className="text-gray-300">Future Goals</Label>
              {isEditing ? (
                <Textarea
                  id="goals"
                  value={data.goals}
                  onChange={(e) => handleInputChange("goals", e.target.value)}
                  className="bg-gray-900/50 border-gray-700 text-white min-h-[100px]"
                  placeholder="What are your future goals and aspirations?"
                />
              ) : (
                <div className="p-3 bg-gray-900/30 rounded-lg border border-gray-700 text-white min-h-[100px]">
                  {data.goals || "Not set"}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              {isEditing ? (
                <>
                  <Button
                    onClick={handleSave}
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button
                    onClick={() => setIsEditing(false)}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Motivational Quote */}
        <Card className="glass-effect border-0 mt-8">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="text-6xl mb-4">✨</div>
              <blockquote className="text-xl font-medium text-white italic leading-relaxed">
                "{motivationalQuote}"
              </blockquote>
              <div className="mt-4 text-gray-400">
                — Your Daily Motivation
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Card className="glass-effect border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-2">
                {data.name ? "✓" : "○"}
              </div>
              <div className="text-sm text-gray-300">Profile Name</div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-2">
                {data.age ? "✓" : "○"}
              </div>
              <div className="text-sm text-gray-300">Age Set</div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-2">
                {data.goals ? "✓" : "○"}
              </div>
              <div className="text-sm text-gray-300">Goals Defined</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}