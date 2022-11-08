import express, { Request, Response, Express } from 'express';

import { IEvent, INewEvent } from './components/events/interfaces';
import eventRoutes from './components/events/routes';
import userRoutes from './components/users/routes';
import placeRoutes from './components/places/routes';
import programRoutes from './components/program/routes';
import authControllers from './components/authentication/controller';

const app: Express = express();
const port: number = 3000;
const apiPath = '/api/v1';

app.use(express.json());
app.post(`${apiPath}/login`, authControllers.login);
app.use(`${apiPath}/events`, eventRoutes);
app.use(`${apiPath}/users`, userRoutes);
app.use(`${apiPath}/places`, placeRoutes);
app.use(`${apiPath}/program`, programRoutes);

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

