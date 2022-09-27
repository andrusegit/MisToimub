console.log("kas töötab");

import express, { Request, Response, Express } from 'express';

const app: Express = express();
const port: number = 3000;
app.use(express.json());

interface INewEvent { // I näitab, et tegemist on interfacega
  organizer: string;
  eventType: string; //valid Teater, Kino, Festival, Kontsert, Muu
  eventName: string;
  eventDescription: string;
  startTime: string; // format dd/mm/yyyy HH:mm
  endTime: string; // optional
  location: string;
  status: number; //0 still in planning, 1 advertise
  ticketPrice: number; //0 if free entrance
}

interface IEvent extends INewEvent {
  id: number;
}

const events: IEvent[] = [
  { id : 1,
    organizer: "Kultuurimaja",
    eventType: "Kino", 
    eventName: "Top Gun",
    eventDescription: "Filmi Top Gun: Maverick (2022) esilinastus",
    startTime: "27.09.2022 17:00",
    endTime: "",
    location: "Haapsalu Kultuurikeskus",
    status: 1, 
    ticketPrice: 5.00 
  },
];


app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App is running on port ${port}`);
});


app.get('/api/v1/eventlist', (req: Request, res: Response) => {
  
  res.status(200).json({
    success: true,
    message: 'Ürituste nimekiri',
    events
  });
});

app.post("/api/v1/eventlist", (req: Request, res: Response) => { 
  const {  organizer,
    eventType,
    eventName,
    eventDescription,
    startTime,
    endTime,
    location,
    status,
    ticketPrice
  }  = req.body; // objekti destruktureerimine
  
  const id = events[events.length-1].id + 1;

  const newEvent: IEvent = {
    id: id,
    organizer: organizer,
    eventType: eventType,
    eventName: eventName,
    eventDescription: typeof eventDescription !== 'undefined' ? eventDescription : "",
    startTime: startTime,
    endTime: typeof endTime !== 'undefined' ? endTime : "",
    location: location,
    status: typeof status !== 'undefined' ? status : 1,
    ticketPrice: typeof ticketPrice !== 'undefined' ? ticketPrice : 0
  };

  events.push(newEvent);

  res.status(200).json({
    success: true,
    message: `New event is added`,
    //message: users,
    // users: users
  }); // serveri vastus, et kõik on hästi, json objekti vastus, mis tagasi saata

});


app.delete("/api/v1/events:id", (req: Request, res: Response) => { 
  const id = parseInt(req.params.id);

  const index = events.findIndex(element => {element.id===id})

  if (!index) {
      return res.status(404).json({
      success: false,
      message: "Event not found",
    });
  }

  events.splice(index, 1); 
  
    return res.status(200).json({
      success: true,
      message: `Event deleted`,
    });
});



