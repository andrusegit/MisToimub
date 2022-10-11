interface INewEvent { // I näitab, et tegemist on interfacega
  userId: number;
  eventType: string; //valid Teater, Kino, Festival, Kontsert, Muu
  eventName: string;
  description: string;
  startDate : string;
  startTime: string; // format dd/mm/yyyy HH:mm
  place: string;
  status: number; //0 still in planning, 1 advertise
  ticketPrice: number; //0 if free entrance
  ticketSale: string; // at the gate and/or link
}

interface IEvent extends INewEvent {
  id: number;
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

export {INewEvent, IEvent, EventStatus}