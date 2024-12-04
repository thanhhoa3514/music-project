import { Request, Response } from "express";
import Song from "../../models/song.model";
import { convertToSlug } from "../../helpers/covertToSlug";

// 
export const result = async (req: Request, res: Response): Promise<void> => {
    const keyword: string = req.query.keyword ? String(req.query.keyword).trim() : "";
    if (!keyword) {
        return res.render("client/pages/search/result", {
            pageTitle: "No Results Found",
            song: [],
        });
    }
    try {

        const keywordRegex = new RegExp(keyword, "i");
        const toSlug=convertToSlug(keyword);

        const regexSlug = new RegExp(toSlug,"i");

        const songs = await Song.find({
            $or: [
                { title: keywordRegex },
                { artist: keywordRegex },
                { slug: regexSlug },
                { lyrics: keywordRegex },
            ]
        }).limit(20).populate({
            path: "singerId",
            select: "fullName"
        }).select("-createdAt -updatedAt");


        if (!songs || songs.length === 0) {
            return res.render("client/pages/search/result", {
              pageTitle: `No Results for "${keyword}"`,
              song: [],
            });
        }
        res.render("client/pages/search/result", {
            pageTitle: `Results for ${keyword}`,
            song: songs
        });
    } catch (error) {
        console.error("Error fetching songs:", error);
        res.status(500).render("client/pages/search/result", {
            pageTitle: "Error",
            song: [],
        });
    }
}