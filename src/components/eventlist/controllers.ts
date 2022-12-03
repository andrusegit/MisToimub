import { Request, Response } from "express";
import ResponseCodes from "../../general.ts/responseCodes";
import { IEventListEvent, IEventProgram } from "./interfaces";
import EventListServices from "./services";
//import EventListMiddlewares from "./middleware";

const EventListControllers = {
  getEventList: async (req: Request, res: Response) => {
    let params: {[key: string]: any} = {};

    if (req.query.host)
      params.organizationID = req.query.place;

    if (req.query.status)
      params.statusID = req.query.status;
    
    if (req.query.dateFrom) 
      params.dateFrom = req.query.dateFrom;

    if (req.query.dateTo)
      params.dateTo = req.query.dateTo;

    const eventList : IEventListEvent[] = await EventListServices.getEventList(params);
    
    res.status(ResponseCodes.success).json({
      success: true,
      message: 'List of events',
      eventList
    });    
  },

  getEventListByOrganization: async (req: Request, res: Response) => {
    let params: {[key: string]: any} = {};
  
    if (req.query.host)
      params.organizationID = parseInt(req.params.organizationID);

    if (req.query.status)
      params.statusID = req.query.status;
    
    if (req.query.dateFrom) 
      params.dateFrom = req.query.dateFrom;

    if (req.query.dateTo)
      params.dateTo = req.query.dateTo;

    const eventList : IEventListEvent[] = await EventListServices.getEventList(params);
    
    res.status(ResponseCodes.success).json({
      success: true,
      message: 'List of events',
      eventList
    });    
  }
}

export default EventListControllers;