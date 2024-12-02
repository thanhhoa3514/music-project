import mongoose from "mongoose";
import { title } from "process";
const topicSchema = new mongoose.Schema(
  {
    title: String,
    avatar: String,
    description: String,
    content: String,
    createdAt: Date,
    updatedAt: Date,
    slug: String,
    author: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);
const Topic= mongoose.model("Topic",topicSchema,"topics");

export default Topic;
