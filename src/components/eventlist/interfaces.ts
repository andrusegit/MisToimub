import { RowDataPacket } from 'mysql2';

interface IEventListEvent {
organizationID: number;
eventTypeID: number;
eventName: string;
description: string;
startTime: string;
placeID: number;
placeDescription: string;
statusID: number,
ticketPrice: number;
ticketSaleOnLine: string;
ticketSaleAtDoor: string;
}

interface IEventListEventSQL extends IEventListEvent, RowDataPacket{
}
  
interface IEventProgram {
  userId: string;
  eventId : number;
  name: string;
  description: string;
  startTime: string;
  time: string;
}

interface IEventProgramSQL extends IEventProgram, RowDataPacket{
}

export { IEventListEvent, IEventListEventSQL, IEventProgram, IEventProgramSQL }