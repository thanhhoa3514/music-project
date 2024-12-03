
import {Router} from "express";
const router:Router=Router();

import * as controller from "../../controllers/client/song.controller";

router.get("/:slugTopic", controller.index);


export const songRoutes:Router= router;