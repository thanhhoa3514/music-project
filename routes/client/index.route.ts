import { Express } from "express";
import { topicRoutes } from "./topic.route";

const routeClient = (app:Express):void => {

  app.use("/topics", topicRoutes);

};
export default routeClient;