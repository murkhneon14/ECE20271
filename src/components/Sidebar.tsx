import { ReactNode } from "react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
}

const navItems: NavItem[] = [
  { id: "confessions", label: "Confessions", icon: "🤫" },
  { id: "memories", label: "Memories", icon: "📸" },
  { id: "quotes", label: "Quotes", icon: "✍️" },
  { id: "playlist", label: "Playlist", icon: "🎵" },
];

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <div className="h-full border-r dark:border-gray-700 p-4">
      <nav className="space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === item.id
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
