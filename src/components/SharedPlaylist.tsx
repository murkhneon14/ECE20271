import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";

export function SharedPlaylist() {
  const songs = useQuery(api.playlist.list) || [];
  const addSong = useMutation(api.playlist.add);
  const [songName, setSongName] = useState("");
  const [artist, setArtist] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!songName.trim() || !artist.trim()) return;

    try {
      await addSong({ songName, artist });
      setSongName("");
      setArtist("");
      toast.success("Song added to playlist!");
    } catch (error) {
      toast.error("Failed to add song");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Class Playlist</h2>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <input
          type="text"
          value={songName}
          onChange={(e) => setSongName(e.target.value)}
          placeholder="Song name"
          className="w-full p-4 rounded-lg border dark:border-gray-700 dark:bg-gray-800"
        />
        <input
          type="text"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          placeholder="Artist"
          className="w-full p-4 rounded-lg border dark:border-gray-700 dark:bg-gray-800"
        />
        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          Add Song
        </button>
      </form>

      <div className="space-y-3">
        {songs.map((song) => (
          <div
            key={song._id}
            className="p-4 rounded-lg bg-white dark:bg-gray-800 border dark:border-gray-700 flex items-center gap-4 hover:shadow-md transition-shadow"
          >
            <div className="h-12 w-12 flex-shrink-0 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl">
              🎵
            </div>
            <div>
              <h3 className="font-medium">{song.songName}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{song.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
