import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import { Document, ObjectId } from "mongoose";
// [GET] /songs/:slugTopic
export const index = async (req: Request, res: Response): Promise<void> => {
    try {
        
        const slugTopic = req.params.slugTopic;
        const topic = await Topic.findOne({
          slug: slugTopic,
          status: "active",
          deleted: false,
        });
        if(!topic){
            return res.redirect("/topics");
        }
        
        const songs=await Song.find({
            topicId:topic.id,
            status: "active",
            deleted: false,
        }).select("avatar title slug singerId like"); // Lấy trường `infoSinger` từ ca sĩ;

    //    console.log(songs);
      
        res.render("client/pages/songs/list", {
          pageTitle: "List Songs",
          songs:songs
        });
    } catch (error) {
        res.redirect("/topics")
    }
};
