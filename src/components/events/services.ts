  import {EventStatus, IEvent, INewEvent } from "./interfaces";
  import {events} from "../../../mockdata"



  const EventServices = {
    getEventList: ({eventStatus = EventStatus.takingPlace, dateFrom = "0000-12-31", dateTo = "9999-12-31"} = {}) : IEvent[] => {
      
      let result : any = [];

      events.forEach(element => {
        if (element.status >= eventStatus 
            && element.startDate >= dateFrom 
            && element.startDate <= dateTo) {

          result.push({
            eventType: element.eventType, 
            eventName: element.eventName,
            description: element.description,
            startDate : element.startDate,
            startTime: element.startTime, 
            location: element.location,
            ticketPrice: element.ticketPrice, 
            ticketSale: element.ticketSale 
          });
        }
      });

      return result;
    },

    getEventListShort: ({dateFrom = "0000-12-31", dateTo = "9999-12-31"} = {}) : IEvent[] => {
      
      let result : any = [];

      events.forEach(element => {
        if (element.status >= EventStatus.takingPlace 
            && element.startDate >= dateFrom 
            && element.startDate <= dateTo) {

          result.push({
            eventName: element.eventName,
            startDate : element.startDate,
            startTime: element.startTime, 
          });
        }
      });

      return result;
    },

    getUserEventList: ({userId = -1, dateFrom = "0000-12-31", dateTo = "9999-12-31"} = {}) => {
      console.log(userId);

      return events.filter((element) => {
         return element.userId == userId 
            && element.startDate >= dateFrom 
            && element.startDate <= dateTo;
      });
    },

    addEvent(newEvent: IEvent) {
      let maxId = -1;

      events.forEach((element) => {
        if(element.id > maxId)
          maxId = element.id;
      });
    
      let id = maxId + 1;

      newEvent.id = id;
      
      events.push(newEvent);

      return id;
    },

    updateEvent(eventToUpdate : IEvent) {
      
      let index = -1;
      events.forEach((element, i)  => {
        if (element.id == eventToUpdate.id)
          index = i;
      });

      if (index > -1 && events[index].userId == eventToUpdate.userId) 
        events[index] = eventToUpdate;
      
        return index;
    },

    deleteEvent(id: number, userId: number) {
      let index = -1;

      events.forEach((element, i)  => {
        if (element.id == id)
          index = i;
      });

      if (index > -1 && events[index].userId == userId)
        events.splice(index, 1);   
      
      return index;
    }

  };


  export default EventServices;