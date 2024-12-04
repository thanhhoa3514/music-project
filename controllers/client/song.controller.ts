import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import { Document, ObjectId } from "mongoose";
import FavoriteSong from "../../models/fovourite-song.model";
// [GET] /songs/:slugTopic
export const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const slugTopic = req.params.slugTopic;
    const topic = await Topic.findOne({
      slug: slugTopic,
      status: "active",
      deleted: false,
    });
    if (!topic) {
      return res.redirect("/topics");
    }

    const songs = await Song.find({
      topicId: topic.id,
      status: "active",
      deleted: false,
    }).select("avatar title slug singerId like"); // Lấy trường `infoSinger` từ ca sĩ;

    //    console.log(songs);

    res.render("client/pages/songs/list", {
      pageTitle: "List Songs",
      songs: songs,
    });
  } catch (error) {
    res.redirect("/topics");
  }
};

// [GET] /songs/detail/:slugTopic/

export const detail = async (req: Request, res: Response): Promise<void> => {
  try {
    const slugSong = req.params.slugSong;
    const song = await Song.findOne({
      slug: slugSong,
      status: "active",
      deleted: false,
    });
    if (!song) {
      return res.redirect("/topics");
    }
    // console.log(song);
    const singer = await Singer.findOne({
      _id: song.singerId,

      deleted: false,
    }).select("fullName");
    // console.log(singer);
    if (!singer) {
      return res.redirect("/topics");
    }

    const topic = await Topic.findOne({
      _id: song.topicId,
      status: "active",
      deleted: false,
    }).select("title");

    const songFavorites = await FavoriteSong.exists({
      songId: song.id,
    });

    (song as any).songFavorites = !!songFavorites;
    // console.log(topic);
    res.render("client/pages/songs/detail", {
      pageTitle: " Songs",
      song: song,
      singer: singer,
      topic: topic,
    });
  } catch (err) {}
};

// [PATCH] /songs/like/:typeLike/:idSong

export const like = async (req: Request, res: Response): Promise<void> => {
  try {
    const idSong: string = req.params.idSong;
    const typeLike: string = req.params.typeLike;
    if (!idSong || !typeLike) {
        res.status(400).send({ message: "Invalid request parameters" });
        return;
    }
    const song = await Song.findOne({
      _id: idSong,
      status: "active",
      deleted: false,
    });
    if (!song) {
        res.status(404).send({ message: "Song not found" });
        return;
    }
    const newLike:number = typeLike === "like" ? song.like||0 + 1 : Math.max(0, song.like||0 - 1);
    await Song.updateOne(
      {
        _id: idSong,
      },
      {
        $set: { like: newLike }
      }
    );
    res.status(200).send({
      message: "Like successful",
      like: newLike,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send({ message: "Internal server error" });
  }
};


// [PATCH] /songs/favorite/:typeFavorite/:idSong

export const favorite = async (req: Request, res: Response): Promise<void> => {
  try {
    const idSong: string = req.params.idSong;
    const typeFavorite: string = req.params.typeFavorite;
    if (!idSong || !typeFavorite) {
      res.status(400).send({ message: "Invalid request parameters" });
      return;
    }
    switch (typeFavorite) {
      case "favorite":
        const existingSongs = FavoriteSong.findOne({
          songId: idSong,
        });
        if (!existingSongs) {
          const newRecord = new FavoriteSong({
            songId: idSong,
          });
          newRecord.save();
        }
        break;
      case "unfavorite":
        await FavoriteSong.deleteOne({
          songId: idSong,
        });
      default:
        break;
    }
    res.status(200).send({
      message: "Added into a favorite list successful",
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send({ message: "Internal server error" });
  }
};
