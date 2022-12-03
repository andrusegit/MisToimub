import express, { Request, Response, Express } from 'express';
import { IEvent, INewEvent } from './components/events/interfaces';
import eventListRoutes from './components/eventlist/routes';
import eventRoutes from './components/events/routes';
import userRoutes from './components/users/routes';
import placeRoutes from './components/places/routes';
import programRoutes from './components/program/routes';
import authControllers from './components/authentication/controller';
import config from './apiConfig';

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./components/doc/openAPI.json');


const app: Express = express();
//const port: number = 3000;
const { apiPath } = config;

app.use(express.json());
app.post(`${apiPath}/login`, authControllers.login);
app.use(`${apiPath}/eventlist`, eventListRoutes);
app.use(`${apiPath}/events`, eventRoutes);
app.use(`${apiPath}/users`, userRoutes);
app.use(`${apiPath}/places`, placeRoutes);
app.use(`${apiPath}/program`, programRoutes);
app.use(`${apiPath}/doc`, swaggerUi.serve, swaggerUi.setup(swaggerFile));


export default app;
