
import {Router} from "express";
const router:Router=Router();

import * as controller from "../../controllers/client/song.controller";

router.get("/:slugTopic", controller.index);
router.get("/detail/:slugSong", controller.detail);
router.patch("/like/:typeLike/:idSong", controller.like);
router.patch("/favorite/:typeFavorite/:idSong", controller.favorite);





export const songRoutes:Router= router;