interface MobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navItems = [
  { id: "confessions", label: "Confessions", icon: "🤫" },
  { id: "memories", label: "Memories", icon: "📸" },
  { id: "quotes", label: "Quotes", icon: "✍️" },
  { id: "playlist", label: "Playlist", icon: "🎵" },
];

export function MobileNav({ activeTab, setActiveTab }: MobileNavProps) {
  return (
    <div className="bg-white dark:bg-gray-900 border-t dark:border-gray-700 py-2 px-4">
      <nav className="flex justify-around">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              activeTab === item.id
                ? "text-purple-500 dark:text-purple-400"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
