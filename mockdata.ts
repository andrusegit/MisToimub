
import { IEvent } from "./src/components/events/interfaces";
import { IUser } from "./src/components/users/interfaces";
import { IPlace } from "./src/components/places/interfaces";

/*
const events: IEvent[] = [
  { id : 1,
    userId: 1,
    eventType: "Kino", 
    eventName: "Top Gun",
    description: "Filmi Top Gun: Maverick (2022) esilinastus",
    startDate: "2022-09-27",
    startTime: "17:00",
    place: "Kultuurimaja",
    status: 1, 
    ticketPrice: 5.00,
    ticketSale : "Väravas" 
  },
  
  { id : 2,
    userId:1,
    eventType: "Teater", 
    eventName: "Kapsapea",
    description: "Oskar Lutsu kapsapea",
    startDate: "2022-09-27",
    startTime: "17:00",
    place: "SEE Teater",
    status: 1, 
    ticketPrice: 5.00,
    ticketSale: "Väravas"
  },

  { id : 3,
      userId: 2,
      eventType: "Festival", 
      eventName: "Augustibluus",
      description: "Bluusifestival",
      startDate: "2022-08-27",
      startTime: "17:00",
      place: "Kultuurimaja",
      status: 0, 
      ticketPrice: 50.00,
      ticketSale: "Väravas" 
    },

    { id : 4,
      userId: 0,
      eventType: "Festival", 
      eventName: "Augustibluus",
      description: "Bluusifestival",
      startDate: "2022-08-28",
      startTime: "11:00",
      place: "Kultuurimaja",
      status: 0, 
      ticketPrice: 50.00,
      ticketSale: "Väravas" 
    },

    { id : 5,
      userId: 0,
      eventType: "Festival", 
      eventName: "Augustibluus",
      description: "Bluusifestival",
      startDate: "2022-08-29",
      startTime: "11:00",
      place: "Kultuurimaja",
      status: 1, 
      ticketPrice: 50.00,
      ticketSale: "Väravas" 
    },
];

const users : IUser[] = [
  {
    id: 0,
    name: "Andrus",
    email: "andrusky@tlu.ee",
    password: "$2b$10$C1WGh2BJeooQsWicE4w.N.LAMlRmpz7oVqpKkfHG1PDSPf0P0tlYi",
    role: "Admin"
  },
  
  {
    id: 1,
    name: "Arabella",
    email: "arabella@tlu.ee",
    password: "$2b$10$9IMWluQhsHwsce01K7ltbeba1dFYauIDT6aX1ExZDsLogtpjakxNi", //"dontellya"
    role: "User"
  },

];

*/

const place : IPlace[] = [
  {
    id: 0,
    name: "Andrus",
    address: "Posti 3, Haapsalu"
  },
  
  {
    id: 1,
    name: "Arabella",
    address: "Vaba 10, Haapsalu"
  },

];



export {place};
