import { Request, Response } from "express";
import ResponseCodes from "../../general.ts/responseCodes";
import { IProgram, INewProgram, IProgramSQL } from "./interfaces";
import ProgramServices from "./services";


const ProgramControllers = {

  getProgramByEvent: async (req: Request, res: Response) => {
    const eventID = parseInt(req.params.eventID);

    const program: IProgram | undefined = await ProgramServices.getProgram(eventID);

    if (program != undefined) {
      res.status(ResponseCodes.success).json({
        success: true,
        message: 'Program of event',
        program
      });
    }
    else {
      res.status(ResponseCodes.badRequest).json({
        success: false,
        message: 'No such program',
      });
    }   
    
  },

  getProgramItem: async (req: Request, res: Response) => {
    
    const eventID = parseInt(req.params.eventID);
    const id = parseInt(req.params.id);

    const program: IProgram | undefined = await ProgramServices.getProgramItem(eventID, id);

    if (program != undefined) {
      res.status(ResponseCodes.success).json({
        success: true,
        message: 'Program Item',
        program
      });
    }
    else {
      res.status(ResponseCodes.badRequest).json({
        success: false,
        message: 'Program item not found',
      });
    }   
    
  },

  addProgram: async (req: Request, res: Response) => {
 
    let userId = res.locals.user.id;

    const {
      eventID, name, description, startTime
    } = req.body;
    
    const newProgram: INewProgram = {
      eventID: eventID, 
      name: name,
      description: description,
      startTime: startTime
    }
    
    let insertId = await ProgramServices.addProgram(newProgram);

    if (insertId > 0) {
      res.status(ResponseCodes.created).json({
        success: true,
        message: 'Program added to list'
      });
    }
    else {
      res.status(ResponseCodes.badRequest).json({
        success: false,
        message: 'Something went wrong, program was not added'
      })}

  },

  updateProgram: async (req: Request, res: Response) => {

    const {  
      ID, eventID, name, description, startTime
    } = req.body;
    
    const program: IProgram = {
      ID: ID,
      eventID: eventID, 
      name: name,
      description: description,
      startTime: startTime
    }
    
    let changedRows = await ProgramServices.updateProgram(program);

    if (changedRows > 0) {
      res.status(ResponseCodes.created).json({
        success: true,
        message: 'Program updated'
      });
    }
    else {
      res.status(ResponseCodes.badRequest).json({
        success: false,
        message: 'Something went wrong, program was not updated'
      })}
  },

  deleteProgram: async (req: Request, res: Response) => {
    let id = parseInt(req.params.id);

    let changedRows = await ProgramServices.deleteProgram(id);

    if (changedRows > 0) {
      res.status(ResponseCodes.success).json({
        success: true,
        message: 'Program deleted from list'
      });
    }
    else {
      res.status(ResponseCodes.badRequest).json({
        success: false,
        message: 'Something went wrong, program was not updated'
      });
    }
  },

}

export default ProgramControllers;