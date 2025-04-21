import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("quotes")
      .withIndex("by_creation")
      .order("desc")
      .collect();
  },
});

export const create = mutation({
  args: {
    text: v.string(),
    author: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("quotes", {
      text: args.text,
      author: args.author,
      createdAt: Date.now(),
    });
  },
});
