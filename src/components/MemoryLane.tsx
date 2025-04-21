import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";

export function MemoryLane() {
  const memories = useQuery(api.memories.list) || [];
  const generateUploadUrl = useMutation(api.memories.generateUploadUrl);
  const createMemory = useMutation(api.memories.create);
  const [caption, setCaption] = useState("");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const postUrl = await generateUploadUrl();
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      const { storageId } = await result.json();
      await createMemory({ imageId: storageId, caption });
      setCaption("");
      toast.success("Memory uploaded!");
    } catch (error) {
      toast.error("Failed to upload memory");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Memory Lane</h2>

      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-end">
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Add a caption..."
            className="w-full sm:flex-1 p-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800 mb-2 sm:mb-0"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full sm:w-auto file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 dark:file:bg-purple-900 dark:file:text-purple-300"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {memories.map((memory) => (
          <div
            key={memory._id}
            className="group relative bg-white dark:bg-gray-800 p-2 sm:p-4 rounded-lg shadow-md transform rotate-[-2deg] hover:rotate-0 transition-all duration-300"
          >
            {memory.imageUrl && (
              <img
                src={memory.imageUrl}
                alt={memory.caption}
                className="w-full h-44 sm:h-48 object-cover rounded-lg mb-2 sm:mb-3 transition-all"
              />
            )}
            <p className="text-center text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base">
              {memory.caption}
            </p>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
