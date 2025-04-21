import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";

export function YearbookQuotes() {
  const quotes = useQuery(api.quotes.list) || [];
  const createQuote = useMutation(api.quotes.create);
  const [newQuote, setNewQuote] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuote.trim() || !author.trim()) return;

    try {
      await createQuote({ text: newQuote, author });
      setNewQuote("");
      setAuthor("");
      toast.success("Quote added to yearbook!");
    } catch (error) {
      toast.error("Failed to add quote");
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Yearbook Quotes</h2>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <textarea
          value={newQuote}
          onChange={(e) => setNewQuote(e.target.value)}
          placeholder="Your memorable quote..."
          className="w-full p-4 rounded-lg border dark:border-gray-700 dark:bg-gray-800"
          rows={2}
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Your name"
          className="w-full p-4 rounded-lg border dark:border-gray-700 dark:bg-gray-800"
        />
        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          Add Quote
        </button>
      </form>

      <div className="space-y-6">
        {quotes.map((quote, index) => (
          <div
            key={quote._id}
            className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg transform hover:-translate-y-1 transition-transform"
            style={{
              transform: `rotate(${index % 2 === 0 ? "1deg" : "-1deg"})`,
            }}
          >
            <blockquote className="text-lg italic mb-2">"{quote.text}"</blockquote>
            <p className="text-right text-gray-600 dark:text-gray-400">
              - {quote.author}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
