import { Request, Response } from "express";
import ResponseCodes from "../../general.ts/responseCodes";
import { IEvent, INewEvent } from "./interfaces";
import EventServices from "./services";
import EventsMiddlewares from "./middleware";

const EventControllers = {
  getEventList: (req: Request, res: Response) => {
    let params: {[key: string]: any} = {};

    if (req.query.status)
      params.eventStatus =  req.query.status;
    
    if (req.query.dateFrom) 
      params.dateFrom = req.query.dateFrom;

    if (req.query.dateTo)
      params.dateTo = req.query.dateTo;

    if (req.query.place)
      params.place = req.query.place;
    
    const eventList : IEvent[] = EventServices.getEventList(params);
    res.status(ResponseCodes.success).json({
      success: true,
      message: 'List of events',
      eventList
    });    
  },

  getEventListShort: (req: Request, res: Response) => {
    let params: {[key: string]: any} = {};

    if (req.query.dateFrom) 
      params.dateFrom = req.query.dateFrom;

    if (req.query.dateTo)
      params.dateTo = req.query.dateTo;
    
    if (req.query.place)
      params.place = req.query.place;

      const eventList : IEvent[] = EventServices.getEventListShort(params);
    res.status(ResponseCodes.success).json({
      success: true,
      message: 'List of events',
      eventList
    });    
  },

  getUserEventList: (req: Request, res: Response) => {
    let params: {[key: string]: any} = {};

    if (req.params.userid)
      params.userId = parseInt(req.params.userid);

    if (req.query.dateFrom) 
      params.dateFrom = req.query.dateFrom;

    if (req.query.dateTo)
      params.dateTo = req.query.dateTo;
    
    const eventList : IEvent[] = EventServices.getUserEventList(params);
    res.status(ResponseCodes.success).json({
      success: true,
      message: 'List of events',
      eventList
    });    
  },

  getEvent: (req: Request, res: Response) => {

  },


  addEvent: (req: Request, res: Response) => {
 
    let userId = parseInt(req.params.userid);

    const {
      eventType, eventName, description,
      startDate, startTime, place,
      status, ticketPrice, ticketSale
    } = req.body;
    
    const newEvent: IEvent = {
      id: -1,
      userId: userId,
      eventType : eventType,
      eventName: eventName,
      description: description,
      startDate: startDate,
      startTime: startTime,
      place: place,
      status: status,
      ticketPrice: ticketPrice,
      ticketSale: ticketSale
    }
    
    let result = EventServices.addEvent(newEvent);
    if (result > -1) {
      res.status(ResponseCodes.created).json({
        success: true,
        message: 'Event added to list'
      }); 
    }
    else{
      res.status(ResponseCodes.badRequest).json({
      success: false,
      message: 'Event was not added'
      }); 
    }
  },

  updateEvent: (req: Request, res: Response) => {

    const {
      id, userId, 
      eventType, eventName, description,
      startDate, startTime, place,
      status, ticketPrice, ticketSale
    } = req.body;
  
    const eventData: IEvent = {
      id: id,
      userId: userId,
      eventType : eventType,
      eventName: eventName,
      description: description,
      startDate: startDate,
      startTime: startTime,
      place: place,
      status: status,
      ticketPrice: ticketPrice,
      ticketSale: ticketSale
    }
  
    let result = EventServices.updateEvent(eventData);
    if (result > -1) {
      res.status(ResponseCodes.created).json({
        success: true,
        message: 'Event updated'
      }); 
    }
    else{
      res.status(ResponseCodes.badRequest).json({
      success: false,
      message: 'Event was not updated'
      }); 
    }
  },

  deleteEvent: (req: Request, res: Response) => {
    let userId = parseInt(req.params.userid);
    let id = parseInt(req.params.id);

    let result = EventServices.deleteEvent(id, userId);

    if (result > -1) {
      res.status(ResponseCodes.success).json({
        success: true,
        message: 'Event deleted from list'
        }); 
    }
     else {
      res.status(ResponseCodes.badRequest).json({
        success: false,
        message: 'Event was not deleted'
        }); 
    }
  },

}

export default EventControllers;