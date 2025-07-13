import { Rocket } from "lucide-react";

interface ProgressHeaderProps {
  currentPage: number;
}

export function ProgressHeader({ currentPage }: ProgressHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Rocket className="text-primary text-2xl animate-pulse-slow" />
            <h1 className="font-orbitron text-2xl font-bold text-primary">DLMS</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((page) => (
                <div
                  key={page}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    page <= currentPage
                      ? "bg-primary animate-pulse"
                      : "bg-gray-500"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
