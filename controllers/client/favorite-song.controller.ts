import { Request, Response } from "express";
import FavoriteSong from "../../models/fovourite-song.model";

import Song from "../../models/song.model";
import Singer from "../../models/singer.model";


// [GET] favorite-songs
export const index = async (req: Request, res: Response): Promise<void> => {
    try {

        const favoriteSongs = await FavoriteSong.find({
            deleted:false
        }).populate({
            path: "songId", // Associate with model Song through songId field
            select: "slug title artist", // Select some essential fields
            populate: {
                path: "singerId", // Continue associate with  Singer qua singerId
                select: "fullName avatar", // Lấy các  từ Singer field  
            },
        });;

        res.render("client/pages/favorite-songs/index", {
            pageTitle: "List Songs Favorite",
            favoriteSongs:favoriteSongs
        });
    } catch (error) {

    }
}