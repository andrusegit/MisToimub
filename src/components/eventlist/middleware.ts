import { Request, Response, NextFunction } from "express";
import ResponseCodes from "../../general.ts/responseCodes";
import UserServices from "../users/services";
//import { IEvent } from "./interfaces";
import EventServices from "./services";

const NOTFOUND = -1;

const EventsMiddlewares = {


  verifyOrganizationInRequest: async (req: Request, res: Response, next: NextFunction)  => {
    
    const {  
      organizationID, 
    } = req.body;
    
    if (organizationID == res.locals.user.organization) 
      next();

    else {
      return res.status(ResponseCodes.badRequest).json({
        success: false,
        message: "Wrong Orgnization id"
      });
    }
  },

/*
  verifyOrganizationInDB: async (req: Request, res: Response, next: NextFunction) => {
    
    const {  
      ID,
      organizationID, 
    } = req.body;
    
    const event: IEvent | undefined= await EventServices.getEvent(parseInt(ID))
    
    if (event == undefined) {
      return res.status(ResponseCodes.badRequest).json({
        success: false,
        message: "Wrong event id"
      });
    }

    if (event.organizationID == res.locals.user.organization) 
      next();
    else {
      return res.status(ResponseCodes.badRequest).json({
        success: false,
        message: "Wrong Orgnization id"
      });
    }
  },
*/
};

export default EventsMiddlewares;
