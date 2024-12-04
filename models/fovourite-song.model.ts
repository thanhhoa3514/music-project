import mongoose from "mongoose";
import { Schema, model, ObjectId } from "mongoose";
const favoriteSongSchema = new mongoose.Schema(
  {
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    songId: {
        type: Schema.Types.ObjectId,
        ref: "Song",
        required: true,
    },
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
favoriteSongSchema.index({ userId: 1, songId: 1 }, { unique: true });
const FavoriteSong = mongoose.model("FavoriteSong", favoriteSongSchema, "favorite-songs");

export default FavoriteSong;