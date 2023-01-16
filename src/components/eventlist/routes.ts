import express from "express";
import EventListControllers from "./controllers";
import EventListMiddlewares from "./middleware";

const eventListRoutes = express.Router();

eventListRoutes
  .get('/', EventListControllers.getEventList)
  .get('/:organizationID', EventListControllers.getEventListByOrganization)
;

export default eventListRoutes;