import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

import { Toaster } from "sonner";
import { useState } from "react";
import { ConfessionWall } from "./components/ConfessionWall";
import { MemoryLane } from "./components/MemoryLane";
import { YearbookQuotes } from "./components/YearbookQuotes";
import { SharedPlaylist } from "./components/SharedPlaylist";
import { MobileNav } from "./components/MobileNav";
import { Sidebar } from "./components/Sidebar";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  const [activeTab, setActiveTab] = useState("confessions");
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? "dark" : ""}`}>
      <div className="dark:bg-gray-900 dark:text-white min-h-screen transition-colors duration-200">
        <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-4 flex justify-between items-center border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            ECE 2027      </h2>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isDark ? "🌞" : "🌙"}
            </button>

          </div>
        </header>

        <main className="flex-1 flex">
            <div className="hidden md:block w-64 h-screen sticky top-0">
              <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
            <div className="flex-1 p-4 md:p-8 pb-20 md:pb-8">
              {activeTab === "confessions" && <ConfessionWall />}
              {activeTab === "memories" && <MemoryLane />}
              {activeTab === "quotes" && <YearbookQuotes />}
              {activeTab === "playlist" && <SharedPlaylist />}
            </div>
            <div className="md:hidden fixed bottom-0 left-0 right-0">
              <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
        </main>
        <Toaster />
      </div>
    </div>
  );
}
