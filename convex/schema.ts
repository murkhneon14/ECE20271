import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


const applicationTables = {
  confessions: defineTable({
    text: v.string(),
    taggedUsers: v.optional(v.array(v.string())),
    reactions: v.object({
      heart: v.number(),
      sad: v.number(),
      wow: v.number(),
      laugh: v.number(),
    }),
    createdAt: v.number(),
  }).index("by_creation", ["createdAt"]),

  memories: defineTable({
    imageId: v.id("_storage"),
    caption: v.string(),
    createdAt: v.number(),
    uploadedBy: v.optional(v.id("users")),
  }).index("by_creation", ["createdAt"]),

  quotes: defineTable({
    text: v.string(),
    author: v.string(),
    createdAt: v.number(),
  }).index("by_creation", ["createdAt"]),

  playlist: defineTable({
    songName: v.string(),
    artist: v.string(),
    addedBy: v.id("users"),
    createdAt: v.number(),
  }).index("by_creation", ["createdAt"]),
};

export default defineSchema({

  ...applicationTables,
});
