import express, { Request, Response, Express } from 'express';

import { IEvent, INewEvent } from './components/events/interfaces';
import {events} from '../mockdata';
import EventControllers from './components/events/controllers';
import UserControllers from './components/users/controllers';
import PlaceControllers from './components/places/controllers';
import EventMiddlewares from './components/events/middleware';


const app: Express = express();
const port: number = 3000;
app.use(express.json());



app.get('/api/v1/eventlist', EventControllers.getEventList);
app.get('/api/v1/eventlist/short', EventControllers.getEventListShort);
app.get('/api/v1/usereventlist/:userid', EventMiddlewares.checkIfUserExists, EventControllers.getUserEventList);
app.put('/api/v1/usereventlist/:userid', EventMiddlewares.checkIfUserExists, EventControllers.addEvent);
app.post('/api/v1/usereventlist', EventControllers.updateEvent);
app.delete('/api/v1/usereventlist/:userid/:id', EventMiddlewares.checkIfUserExists, EventControllers.deleteEvent);

app.get('/api/v1/user', UserControllers.getUserList);
app.put('/api/v1/user', UserControllers.addUser);
app.post('/api/v1/user', UserControllers.updateUser);
app.delete('/api/v1/user/:id', UserControllers.deleteUser);

app.get('/api/v1/place', PlaceControllers.getPlaceList);
app.put('/api/v1/place', PlaceControllers.addPlace);
app.post('/api/v1/place', PlaceControllers.updatePlace);
app.delete('/api/v1/place/:id', PlaceControllers.deletePlace);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App is running on port ${port}`);
});


