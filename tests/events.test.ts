import request from 'supertest';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import app from '../src/app';
import config from '../src/apiConfig';
import ResponseCodes from "../src/general.ts/responseCodes";

const { apiPath } = config; 

const user = {
  email: 'test@test.ee',
  password: 'dontellya',
};

let userToken = "";


const insertEventWrongOrgID = {
  organizationID: 2,
  eventTypeID: 3,
  eventName: "Apteeker Melchior",
  description: "Filmi esilinastus",
  startTime: "2022-12-01 17:00",
  placeID: 1,
  placeDescription: "",
  public: true,
  ticketPrice: 5.00,
  ticketSaleOnLine: "",
  ticketSaleAtDoor: true
};

const insertEvent = {
  organizationID: 1,
  eventTypeID: 3,
  eventName: "Apteeker Melchior",
  description: "Filmi esilinastus",
  startTime: "2022-12-01 17:00",
  placeID: 1,
  placeDescription: "",
  public: true,
  ticketPrice: 5.00,
  ticketSaleOnLine: "",
  ticketSaleAtDoor: true
};

const updateEventWrongOrgID = {
  ID: 1,
  organizationID: 2,
  eventTypeID: 3,
  eventName: "Apteeker Melchior",
  description: "Eesti filmi esilinastus",
  startTime: "2022-12-01 17:00",
  placeID: 1,
  placeDescription: "",
  public: true,
  ticketPrice: 5.00,
  ticketSaleOnLine: "",
  ticketSaleAtDoor: true
};

let random = Math.random();

const updateEvent = {
  ID: 1,
  organizationID: 1,
  eventTypeID: 3,
  eventName: "Apteeker Melchior",
  description: "Uue vinge filmi esilinastus " + random,
  startTime: "2022-12-04 17:00",
  placeID: 1,
  placeDescription: "",
  public: true,
  ticketPrice: 5.00,
  ticketSaleOnLine: "",
  ticketSaleAtDoor: true
};


describe("Events Login", () => {
  it(`sends statuscode and token ${ResponseCodes.success}`, async () => {
    const response = await request(app).post(`${apiPath}/login`).send(user);
    expect(response.statusCode).to.equal(ResponseCodes.success);
    userToken = response.body.token;
  });
});



describe('GET events', () => {
  it(`Eventlist without token sends statuscode ${ResponseCodes.unauthorized}`, async () => {
    const response = await request(app).get(`${apiPath}/events`);
    expect(response.statusCode).to.equal(ResponseCodes.unauthorized);
  });
  it(`Eventlist, sends statuscode ${ResponseCodes.success}`, async () => {
    const response = await request(app).get(`${apiPath}/events`).set('Authorization', 'bearer ' + userToken);
    expect(response.body).to.be.a('object');
    expect(response.statusCode).to.equal(ResponseCodes.success);
    expect(response.body.success).to.be.true;
    expect(response.body.message).to.equal('List of events');

    console.log(userToken);

  });
});

describe('GET events/:eventID', () => {
  it(`Event without token sends statuscode ${ResponseCodes.unauthorized}`, async () => {
    const response = await request(app).get(`${apiPath}/events/1`);
    expect(response.statusCode).to.equal(ResponseCodes.unauthorized);
  });
  it(`Event, sends statuscode ${ResponseCodes.success}`, async () => {
    const response = await request(app).get(`${apiPath}/events/1`).set('Authorization', 'bearer ' + userToken);
    expect(response.body).to.be.a('object');
    expect(response.statusCode).to.equal(ResponseCodes.success);
    expect(response.body.success).to.be.true;
    expect(response.body.message).to.equal('Selected event');
  });
  it(`Event does not exist, sends statuscode ${ResponseCodes.badRequest}`, async () => {
    const response = await request(app).get(`${apiPath}/events/ABC`).set('Authorization', 'bearer ' + userToken);
    expect(response.body).to.be.a('object');
    expect(response.statusCode).to.equal(ResponseCodes.badRequest);
    expect(response.body.success).to.be.false;
    expect(response.body.message).to.equal('No such event');
  });
});

describe('PUT events/', () => {
  it(`Event without token sends statuscode ${ResponseCodes.unauthorized}`, async () => {
    const response = await request(app).put(`${apiPath}/events/`).send(insertEvent);
    expect(response.statusCode).to.equal(ResponseCodes.unauthorized);
  });

  it(`Event, wrong organizationID statuscode ${ResponseCodes.badRequest}`, async () => {
    const response = await request(app).put(`${apiPath}/events/`).send(insertEventWrongOrgID).set('Authorization', 'bearer ' + userToken);
    expect(response.body).to.be.a('object');
    expect(response.statusCode).to.equal(ResponseCodes.badRequest);
    expect(response.body.success).to.be.false;
    expect(response.body.message).to.equal('Wrong Orgnization id');
  });
 
  it(`Event, sends statuscode ${ResponseCodes.created}`, async () => {
    const response = await request(app).put(`${apiPath}/events/`).send(insertEvent).set('Authorization', 'bearer ' + userToken);
    expect(response.body).to.be.a('object');
    expect(response.statusCode).to.equal(ResponseCodes.created);
    expect(response.body.success).to.be.true;
    expect(response.body.message).to.equal('Event added to list');
  });
});

describe('POST events/', () => {
  it(`Event without token sends statuscode ${ResponseCodes.unauthorized}`, async () => {
    const response = await request(app).post(`${apiPath}/events/`).send(updateEvent);
    expect(response.statusCode).to.equal(ResponseCodes.unauthorized);
  });
  it(`Event, wrong organizationID statuscode ${ResponseCodes.badRequest}`, async () => {
    const response = await request(app).post(`${apiPath}/events/`).send(updateEventWrongOrgID).set('Authorization', 'bearer ' + userToken);
    expect(response.body).to.be.a('object');
    expect(response.statusCode).to.equal(ResponseCodes.badRequest);
    expect(response.body.success).to.be.false;
    expect(response.body.message).to.equal('Wrong Orgnization id');
  });

  it(`Event, sends statuscode ${ResponseCodes.success}`, async () => {
    const response = await request(app).post(`${apiPath}/events/`).send(updateEvent).set('Authorization', 'bearer ' + userToken);
    expect(response.body).to.be.a('object');
    expect(response.statusCode).to.equal(ResponseCodes.success);
    expect(response.body.success).to.be.true;
    expect(response.body.message).to.equal('Event updated');
  });
});

describe('DELETE events/:eventID', () => {
  it(`Event without token sends statuscode ${ResponseCodes.unauthorized}`, async () => {
    const response = await request(app).delete(`${apiPath}/events/1`);
    expect(response.statusCode).to.equal(ResponseCodes.unauthorized);
  });
  it(`Event, wrong organizationID statuscode ${ResponseCodes.badRequest}`, async () => {
    const response = await request(app).delete(`${apiPath}/events/2`).set('Authorization', 'bearer ' + userToken);
    expect(response.body).to.be.a('object');
    expect(response.statusCode).to.equal(ResponseCodes.badRequest);
    expect(response.body.success).to.be.false;
    expect(response.body.message).to.equal('Wrong Orgnization id');
  });
  it(`Event, sends statuscode ${ResponseCodes.success}`, async () => {
    const response = await request(app).delete(`${apiPath}/events/1`).set('Authorization', 'bearer ' + userToken);
    expect(response.body).to.be.a('object');
    expect(response.statusCode).to.equal(ResponseCodes.success);
    expect(response.body.success).to.be.true;
    expect(response.body.message).to.equal('Event deleted from list');
  });
});

