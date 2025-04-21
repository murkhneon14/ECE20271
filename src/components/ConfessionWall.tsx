import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import { CONFESSION_USERS } from "./confessionUsers";

const reactionEmojis = {
  heart: "❤️",
  sad: "😢",
  wow: "😮",
  laugh: "😆",
};

import { Combobox } from "@headlessui/react";
import { XMarkIcon, CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

function TagUserMultiSelect({ users, selected, setSelected }: {
  users: string[];
  selected: string[];
  setSelected: (users: string[]) => void;
}) {
  const [query, setQuery] = useState("");
  const filtered =
    query === ""
      ? users
      : users.filter((u) => u.toLowerCase().includes(query.toLowerCase()));

  return (
    <Combobox value={selected} onChange={setSelected} multiple>
      <div className="relative mb-4">
        <div className="flex flex-wrap gap-1 mb-1">
          {selected.map((user) => (
            <span key={user} className="flex items-center bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs mr-1">
              {user}
              <button
                type="button"
                className="ml-1 text-purple-400 hover:text-purple-700 focus:outline-none"
                onClick={() => setSelected(selected.filter((u) => u !== user))}
              >
                <XMarkIcon className="w-4 h-4" aria-hidden="true" />
              </button>
            </span>
          ))}
        </div>
        <Combobox.Input
          className="w-full p-2 rounded border dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          onChange={(e) => setQuery(e.target.value)}
          displayValue={() => ""}
          placeholder={selected.length ? "Add more..." : "Search and select users to tag"}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>
        {filtered.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            {filtered.map((user) => (
              <Combobox.Option
                key={user}
                value={user}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active ? "bg-purple-100 text-purple-900 dark:bg-purple-700 dark:text-white" : "text-gray-900 dark:text-gray-200"
                  }`
                }
              >
                {({ selected: isSelected }) => (
                  <>
                    <span className={`block truncate ${isSelected ? "font-medium" : "font-normal"}`}>{user}</span>
                    {isSelected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600 dark:text-purple-300">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}

export function ConfessionWall() {
  const confessions = useQuery(api.confessions.list) || [];
  const createConfession = useMutation(api.confessions.create);
  const reactToConfession = useMutation(api.confessions.react);
  const [newConfession, setNewConfession] = useState("");
  const [taggedUsers, setTaggedUsers] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newConfession.trim()) return;

    try {
      await createConfession({ text: newConfession, taggedUsers });
      setNewConfession("");
      setTaggedUsers([]);
      toast.success("Confession posted anonymously!");
    } catch (error) {
      toast.error("Failed to post confession");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Confession Wall</h2>
      
      <form onSubmit={handleSubmit} className="mb-8">
        {/*
          Enhanced Tagging UI: Uses Headless UI Combobox for a searchable, beautiful multi-select.
          If you don't have @headlessui/react and @heroicons/react, run:
          npm install @headlessui/react @heroicons/react
        */}
        <label className="block mb-2 font-medium">Tag people (optional):</label>
        <TagUserMultiSelect
          users={CONFESSION_USERS}
          selected={taggedUsers}
          setSelected={setTaggedUsers}
        />
        <textarea
          value={newConfession}
          onChange={(e) => setNewConfession(e.target.value)}
          placeholder="Share your secret confession..."
          className="w-full p-4 rounded-lg border dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          rows={3}
        />
        <button
          type="submit"
          className="mt-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          Post Anonymously
        </button>
      </form>

      <div className="space-y-4">
        {confessions.map((confession) => (
          <div
            key={confession._id}
            className="p-4 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
          >
            <p className="text-gray-800 dark:text-gray-200 mb-4">{confession.text}</p>
            {confession.taggedUsers && confession.taggedUsers.length > 0 && (
              <div className="mb-2 text-sm text-purple-600 dark:text-purple-300">
                Tagged: {confession.taggedUsers.join(", ")}
              </div>
            )}
            <div className="flex gap-2">
              {Object.entries(confession.reactions).map(([reaction, count]) => (
                <button
                  key={reaction}
                  onClick={() => reactToConfession({ confessionId: confession._id, reaction: reaction as any })}
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <span>{reactionEmojis[reaction as keyof typeof reactionEmojis]}</span>
                  <span className="text-sm">{count}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
