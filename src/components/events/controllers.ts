import { Request, Response } from "express";
import ResponseCodes from "../../general.ts/responseCodes";
import { IEvent, INewEvent } from "./interfaces";
import EventServices from "./services";
import EventsMiddlewares from "./middleware";

const EventControllers = {
  getEventList: async (req: Request, res: Response) => {
    let params: {[key: string]: any} = {};

    if (req.query.host)
      params.organizationID = req.query.host;

    if (req.query.published)
      params.published = req.query.published;
    
    if (req.query.dateFrom) 
      params.dateFrom = req.query.dateFrom;

    if (req.query.dateTo)
      params.dateTo = req.query.dateTo;

    const eventList : IEvent[] = await EventServices.getEventList(params);
    
    res.status(ResponseCodes.success).json({
      success: true,
      message: 'List of events',
      eventList
    });    
  },


  getEvent: async (req: Request, res: Response) => {
    let id = parseInt(req.params.id);

    const event: IEvent | undefined = await EventServices.getEvent(id);

    if (event != undefined) {
      res.status(ResponseCodes.success).json({
        success: true,
        message: 'Selected event',
        event
      });
    }
    else {
      res.status(ResponseCodes.badRequest).json({
        success: false,
        message: 'No such event',
      });
    }   
    
  },

  addEvent: async (req: Request, res: Response) => {
 
    let userId = res.locals.user.id;

    const {  
      organizationID, eventTypeID, eventName,
      description, startTime, placeID, placeDescription,
      published, ticketPrice, ticketSaleOnLine,
      ticketSaleAtDoor
    } = req.body;
    
    const newEvent: INewEvent = {
      organizationID: organizationID,
      eventTypeID: eventTypeID,
      eventName: eventName,
      description: description,
      startTime: startTime,
      placeID: placeID,
      placeDescription: placeDescription,
      published: published,
      ticketPrice: ticketPrice,
      ticketSaleOnLine: ticketSaleOnLine,
      ticketSaleAtDoor: ticketSaleAtDoor
    }
    
    let insertId = await EventServices.addEvent(newEvent);

    if (insertId > 0) {
      res.status(ResponseCodes.created).json({
        success: true,
        message: 'Event added to list',
        ID: insertId
      });
    }
    else {
      res.status(ResponseCodes.badRequest).json({
        success: false,
        message: 'Something went wrong, event was not added'
      })}

  },

  updateEvent: async (req: Request, res: Response) => {

    const {  
      ID,
      organizationID, eventTypeID, eventName,
      description, startTime, placeID, placeDescription,
      published ,ticketPrice, ticketSaleOnLine,
      ticketSaleAtDoor
    } = req.body;
    
    const event: IEvent = {
      ID: ID,
      organizationID: organizationID,
      eventTypeID: eventTypeID,
      eventName: eventName,
      description: description,
      startTime: startTime,
      placeID: placeID,
      placeDescription: placeDescription,
      published: published,
      ticketPrice: ticketPrice,
      ticketSaleOnLine: ticketSaleOnLine,
      ticketSaleAtDoor: ticketSaleAtDoor
    }
    
    let changedRows = await EventServices.updateEvent(event);

    if (changedRows > 0) {
      res.status(ResponseCodes.success).json({
        success: true,
        message: 'Event updated'
      });
    }
    else {
      res.status(ResponseCodes.badRequest).json({
        success: false,
        message: 'Something went wrong, event was not updated'
      })}
  },

  deleteEvent: async (req: Request, res: Response) => {
    let id = parseInt(req.params.id);

    let changedRows = await EventServices.deleteEvent(id);

    if (changedRows > 0) {
      res.status(ResponseCodes.success).json({
        success: true,
        message: 'Event deleted from list'
      });
    }
    else {
      res.status(ResponseCodes.badRequest).json({
        success: false,
        message: 'Something went wrong, event was not deleted'
      });
    }
  },

}

export default EventControllers;