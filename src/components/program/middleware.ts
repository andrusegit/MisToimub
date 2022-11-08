import { Request, Response, NextFunction } from "express";
import ResponseCodes from "../../general.ts/responseCodes";
import { IProgram } from "./interfaces";
import ProgramServices from "./services";

const ProgramMiddlewares = {

  verifyOrganizationInRequest: async (req: Request, res: Response, next: NextFunction)  => {
    
    const {  
      eventID, 
    } = req.body;

    let organizationID = await ProgramServices.getProgramEventOrganization(eventID);

    if (organizationID == res.locals.user.organization) 
      next();
    else {
      return res.status(ResponseCodes.badRequest).json({
        success: false,
        message: "Wrong Orgnization id"
      });
    }
  },
}

export default ProgramMiddlewares;