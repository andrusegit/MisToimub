import express from "express";
import authControllers from "../authentication/controller";
import authMiddleware from "../authentication/middleware";
import EventControllers from "./controllers";
import EventMiddlewares from "./middleware";
const eventRoutes = express.Router();

eventRoutes
  .get('/', EventControllers.getEventList)
  .get('/:id', EventControllers.getEvent)
  .put('/', authMiddleware.isLoggedIn, EventMiddlewares.verifyOrganizationInRequest, EventControllers.addEvent)
  .post('/', authMiddleware.isLoggedIn, EventMiddlewares.verifyOrganizationInRequest, 
    EventMiddlewares.verifyOrganizationInDB, EventControllers.updateEvent)
  .delete('/:id', authMiddleware.isLoggedIn, EventMiddlewares.verifyOrganizationInDB, EventControllers.deleteEvent)
;

export default eventRoutes;