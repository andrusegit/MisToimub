import express from "express";
import ProgramControllers from "./controllers";
import ProgramMiddlewares from "./middleware";
import authMiddleware from "../authentication/middleware";
import { Router } from "express";

const programRoutes = express.Router();

programRoutes
  .get('/', ProgramControllers.getProgramList)
  .put('/', authMiddleware.isLoggedIn, ProgramMiddlewares.verifyOrganizationInRequest, ProgramControllers.addProgram)
  .post('/', authMiddleware.isLoggedIn, ProgramMiddlewares.verifyOrganizationInRequest, ProgramControllers.updateProgram)
  .delete('/:id', authMiddleware.isLoggedIn, ProgramMiddlewares.verifyOrganizationInRequest, ProgramControllers.deleteProgram)
;

export default programRoutes;