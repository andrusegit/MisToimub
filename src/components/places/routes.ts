import express from "express";
import PlaceControllers from "./controllers";
import authMiddleware from "../authentication/middleware";
import { Router } from "express";

const placeRoutes = express.Router();

placeRoutes
  .get('/', PlaceControllers.getPlaceList)
  .put('/', authMiddleware.isLoggedIn, authMiddleware.isAdmin, PlaceControllers.addPlace)
  .post('/', authMiddleware.isLoggedIn, authMiddleware.isAdmin, PlaceControllers.updatePlace)
  .delete('/:id', authMiddleware.isLoggedIn, authMiddleware.isAdmin, PlaceControllers.deletePlace)
;

export default placeRoutes;