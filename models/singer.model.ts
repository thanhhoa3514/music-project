import mongoose from "mongoose";
import { title } from "process";
const singerSchema = new mongoose.Schema(
    {
        fullName: {
          type: String,
          required: true,
          trim: true,
        },
        avatar: {
          type: String,
          default: null, // URL ảnh đại diện
        },
        description: {
          type: String,
          trim: true,
        },
        genre: {
          type: String,
          trim: true, // thể loại nhạc chính của ca sĩ
        },
        dateOfBirth: Date,
        nationality: String,
        songs: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Song", // tham chiếu đến model Song
          },
        ],
        socialMedia: {
          facebook: String,
          instagram: String,
          twitter: String,
          youtube: String,
        },
        slug: {
          type: String,
          required: true,
          unique: true,
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
const Singer= mongoose.model("Singer",singerSchema,"singers");

export default Singer;
