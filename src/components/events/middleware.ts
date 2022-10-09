import { Request, Response, NextFunction } from "express";
import userQueries from "../users/queries";
import ResponseCodes from "../../general.ts/responseCodes";

const EventsMiddlewares = {
  checkIfUserExists: (req: Request, res: Response, next: NextFunction) => {

    if (userQueries.userExists(parseInt(req.params.userid))) {
      next();
    }
    else {
      return res.status(ResponseCodes.badRequest).json({
        success: false,
        message: "No such user"
      });
    }
  },

};


export default EventsMiddlewares;