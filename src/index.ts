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
  { id : 2,
    organizer: "SEE Teater",
    eventType: "Teater", 
    eventName: "Kapsapea",
    eventDescription: "Oskar Lutsu kapsapea",
    startTime: "27.09.2022 17:00",
    endTime: "",
    location: "SEE Teater",
    status: 1, 
    ticketPrice: 5.00 
  },
];

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
  }); 

});

app.put("/api/v1/eventlist/:id", (req: Request, res: Response) => { 

  const id = parseInt(req.params.id);

  const {
    organizer,
    eventType,
    eventName,
    eventDescription,
    startTime,
    endTime,
    location,
    status,
    ticketPrice
  }  = req.body; 
  
  const index = events.findIndex(element => {return element.id===id ? true : false});

  if (index > -1) {
    if (typeof organizer !== 'undefined')
      events[index]["organizer"] = organizer;
  
    if (typeof eventType !== 'undefined')
      events[index]["eventType"] = eventType;
   
    if (typeof eventName !== 'undefined')
      events[index]["eventName"] = eventName;

    if (typeof eventDescription !== 'undefined')
      events[index]["eventDescription"] = eventDescription;

    if (typeof startTime !== 'undefined')
      events[index]["startTime"] = startTime;

    if (typeof endTime !== 'undefined')
      events[index]["endTime"] = endTime;

    if (typeof location !== 'undefined')
      events[index]["location"] = location;

    if (typeof status !== 'undefined')
      events[index]["status"] = status;

    if (typeof eventName !== 'undefined')
      events[index]["ticketPrice"] = ticketPrice;

    res.status(200).json({
      success: true,
      message: `Event is updated`,
    });
  }
  else {
    return res.status(404).json({
      success: false,
      message: "Event not found",
    });
  }
});

app.delete("/api/v1/eventlist/:id", (req: Request, res: Response) => { 
  const id = parseInt(req.params.id);
  
  const index = events.findIndex(element => {return element.id===id ? true : false});

  if (index > -1) {
    events.splice(index, 1); 
  
    return res.status(200).json({
      success: true,
      message: `Event deleted`,
    });

  }
  else {
    return res.status(404).json({
      success: false,
      message: "Event not found",
    });
  }
});



app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App is running on port ${port}`);
});


