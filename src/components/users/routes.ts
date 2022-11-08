import express from "express";
import UserControllers from "./controllers";
import { Router } from "express";
import authMiddleware from "../authentication/middleware";
const userRoutes = express.Router()


userRoutes
  .get('/', authMiddleware.isLoggedIn, authMiddleware.isAdmin, UserControllers.getUserList)
  .put('/', UserControllers.addUser)
  .post('/', authMiddleware.isLoggedIn, authMiddleware.isAdmin, UserControllers.updateUser)
  .delete('/:id', authMiddleware.isLoggedIn, authMiddleware.isAdmin, UserControllers.deleteUser)
;

export default userRoutes;