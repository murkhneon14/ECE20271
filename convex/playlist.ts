import { mutation, query } from "./_generated/server";
import { v } from "convex/values";


export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("playlist")
      .withIndex("by_creation")
      .order("desc")
      .collect();
  },
});

export const add = mutation({
  args: {
    songName: v.string(),
    artist: v.string(),
  },
  handler: async (ctx, args) => {


    await ctx.db.insert("playlist", {
      songName: args.songName,
      artist: args.artist,
      createdAt: Date.now(),
    } as any);
  },
});
