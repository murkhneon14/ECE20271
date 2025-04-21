import { mutation, query } from "./_generated/server";
import { v } from "convex/values";


export const list = query({
  args: {},
  handler: async (ctx) => {
    const memories = await ctx.db
      .query("memories")
      .withIndex("by_creation")
      .order("desc")
      .collect();

    return await Promise.all(
      memories.map(async (memory) => ({
        ...memory,
        imageUrl: await ctx.storage.getUrl(memory.imageId),
      }))
    );
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const create = mutation({
  args: {
    imageId: v.id("_storage"),
    caption: v.string(),
  },
  handler: async (ctx, args) => {


    await ctx.db.insert("memories", {
      imageId: args.imageId,
      caption: args.caption,
      createdAt: Date.now(),
    });
  },
});
