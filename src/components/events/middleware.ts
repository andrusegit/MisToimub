import { Request, Response, NextFunction } from "express";
import { events } from "../../../mockdata";
import ResponseCodes from "../../general.ts/responseCodes";
import UserServices from "../users/services";
import EventServices from "./services";

const NOTFOUND = -1;

const EventsMiddlewares = {
  isUserExist: (req: Request, res: Response, next: NextFunction) => {

    if (UserServices.isUserExists(parseInt(req.params.userid))) {
      next();
    }
    else {
      return res.status(ResponseCodes.badRequest).json({
        success: false,
        message: "No such user"
      });
    }
  },

  verifyUserIdOnDelete: (req: Request, res: Response, next: NextFunction) => {
    
    const index = EventServices.findEventById(parseInt(req.params.id))
    
    if (events[index].userId == res.locals.user.id) 
      next();
    else {
      return res.status(ResponseCodes.badRequest).json({
        success: false,
        message: "Wrong user id"
      });
    }
  },

  verifyUserIdOnInsert: (req: Request, res: Response, next: NextFunction) => {
    
    if (req.body.userId == res.locals.user.id) 
      next();
    else {
      return res.status(ResponseCodes.badRequest).json({
        success: false,
        message: "Wrong user id"
      });
    }
  },

  verifyUserIdOnUpdate: (req: Request, res: Response, next: NextFunction) => {
    
    const index = EventServices.findEventById(req.body.id);
    
    if (index > NOTFOUND
      && req.body.userId == res.locals.user.id
      && events[index].userId == res.locals.user.id) 
      next();
    else {
      return res.status(ResponseCodes.badRequest).json({
        success: false,
        message: "Wrong user id"
      });
    }
  },

};


export default EventsMiddlewares;