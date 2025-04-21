import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("confessions")
      .withIndex("by_creation")
      .order("desc")
      .collect();
  },
});

export const create = mutation({
  args: {
    text: v.string(),
    taggedUsers: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const confessionDoc: any = {
      text: args.text,
      reactions: {
        heart: 0,
        sad: 0,
        wow: 0,
        laugh: 0,
      },
      createdAt: Date.now(),
    };
    if (args.taggedUsers) {
      confessionDoc.taggedUsers = args.taggedUsers;
    }
    await ctx.db.insert("confessions", confessionDoc);
  },
});

export const react = mutation({
  args: {
    confessionId: v.id("confessions"),
    reaction: v.union(
      v.literal("heart"),
      v.literal("sad"),
      v.literal("wow"),
      v.literal("laugh")
    ),
  },
  handler: async (ctx, args) => {
    const confession = await ctx.db.get(args.confessionId);
    if (!confession) return;
    
    const reactions = { ...confession.reactions };
    reactions[args.reaction]++;
    
    await ctx.db.patch(args.confessionId, {
      reactions,
    });
  },
});
