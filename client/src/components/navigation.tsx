import { Link, useLocation } from "wouter";
import { Home, CheckSquare, BookOpen, Smile, Rocket, MoreHorizontal, X, Gamepad2, User, Clock } from "lucide-react";
import { useState } from "react";

export function Navigation() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/todo", label: "To-Do List", icon: CheckSquare },
    { path: "/journal", label: "Journal", icon: BookOpen },
    { path: "/mood", label: "Mood", icon: Smile },
    { path: "/habit-tracker", label: "Habits", icon: Rocket },
    { path: "/workout-timer", label: "Workout", icon: Clock },
    { path: "/break-time", label: "Break Time", icon: Gamepad2 },
    { path: "/about-me", label: "About Me", icon: User },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Rocket className="text-white text-2xl animate-pulse-slow" />
              <h1 className="font-orbitron text-2xl font-bold text-white">DLMS</h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* Always show Home */}
              <Link href="/">
                <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                  location === "/" 
                    ? "bg-primary/20 text-primary" 
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}>
                  <Home className="h-5 w-5" />
                  <span className="text-sm font-medium hidden sm:inline">Home</span>
                </div>
              </Link>
              
              {/* Menu Button */}
              <button
                onClick={toggleMenu}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 text-gray-400 hover:text-white hover:bg-white/10"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <MoreHorizontal className="h-5 w-5" />
                )}
                <span className="text-sm font-medium hidden sm:inline">Menu</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute top-full right-4 mt-2 w-64 glass-effect rounded-lg shadow-xl border border-white/20 overflow-hidden">
            <div className="py-2">
              {navItems.slice(1).map((item) => {
                const Icon = item.icon;
                const isActive = location === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={closeMenu}
                  >
                    <div className={`flex items-center space-x-3 px-4 py-3 transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-primary/20 text-primary"
                        : "text-gray-400 hover:text-white hover:bg-white/10"
                    }`}>
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Click overlay to close menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={closeMenu}
        />
      )}
    </>
  );
}