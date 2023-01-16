import { RowDataPacket } from 'mysql2';

interface INewEvent {
organizationID: number;
eventTypeID: number;
eventName: string;
description: string;
startTime: string;
placeID: number;
placeDescription: string;
published: number,
ticketPrice: number;
ticketSaleOnLine: string;
ticketSaleAtDoor: string;
}

interface IEvent extends INewEvent {
  ID: number;
}

interface IEventSQL extends IEvent, RowDataPacket {
  deleteDate: string;
}



interface IProgram {
  userId: string;
  eventId : number;
  name: string;
  description: string;
  date: string;
  time: string;
}

const EventStatus = {
  intent: 0,
  takingPlace: 1
}

export {INewEvent, IEvent, IEventSQL, EventStatus}