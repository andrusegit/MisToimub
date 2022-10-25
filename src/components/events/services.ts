  import {EventStatus, IEvent, INewEvent } from "./interfaces";
  import {events} from "../../../mockdata"


  const NOTFOUND : number = -1,
  MINDATE: string = "0000-01-01",
  MAXDATE: string = "9999-12-31" 



  const EventServices = {
    
    getEventList: ({eventStatus = EventStatus.takingPlace,
       dateFrom = MINDATE, dateTo = MAXDATE, 
        place = ''} = {}) : IEvent[] => {
      
      let result : any = [];

      events.forEach(element => {
        if (element.status >= eventStatus 
            && element.startDate >= dateFrom 
            && element.startDate <= dateTo
            && (place =='' || element.place == place)) {

          result.push({
            eventType: element.eventType, 
            eventName: element.eventName,
            description: element.description,
            startDate : element.startDate,
            startTime: element.startTime, 
            place: element.place,
            ticketPrice: element.ticketPrice, 
            ticketSale: element.ticketSale 
          });
        }
      });

      return result;
    },

    getEventListShort: ({dateFrom = MINDATE, dateTo = MAXDATE, place = ''} = {}) : IEvent[] => {
      
      let result : any = [];

      events.forEach(element => {
        
        if (element.status >= EventStatus.takingPlace 
            && element.startDate >= dateFrom 
            && element.startDate <= dateTo
            && (place =='' || element.place == place)) {

          result.push({
            place: element.place,
            eventName: element.eventName,
            startDate : element.startDate,
            startTime: element.startTime, 
          });
        }
      });

      return result;
    },

    getUserEventList: ({userId = -1, dateFrom = MINDATE, dateTo = MAXDATE} = {}) => {
      console.log(userId);

      return events.filter((element) => {
         return element.userId == userId 
            && element.startDate >= dateFrom 
            && element.startDate <= dateTo;
      });
    },

    addEvent(newEvent: IEvent) {
      let newId = NOTFOUND;

      events.forEach((element) => {
        Math.max(newId, element.id)
      });
    
      newId++;

      newEvent.id = newId;
      events.push(newEvent);

      return newId;
    },

    updateEvent(eventToUpdate : IEvent) {
      
      const index = events.findIndex((element)  => {
        element.id == eventToUpdate.id
      });

      if (index > NOTFOUND && events[index].userId == eventToUpdate.userId) 
        events[index] = eventToUpdate;
      
        return index; 
    },

    deleteEvent(id: number, userId: number) {
      
      const index = events.findIndex((element)  => {
        element.id == id
      });

      if (index > NOTFOUND && events[index].userId == userId)
        events.splice(index, 1);   
      
      return index;
    },

    findEventById: (id: number) => {
      const index = events.findIndex((element) => {
        element.id == id
      })
      
      return index;
    }

  };


  export default EventServices;