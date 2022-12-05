import request from 'supertest';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import app from '../src/app';
import config from '../src/apiConfig';
import ResponseCodes from "../src/general.ts/responseCodes";

const { apiPath } = config; 
const dateFrom = "2022-08-01";
const dateTo = "2022-12-31";
const organizationID = 1;

describe('Eventlist tests', () => {
  describe(`GET eventList ${apiPath}/eventlist`, () => {
    it(`responds with message and statuscode ${ResponseCodes.success}`, async () => {
      const response = await request(app).get(`${apiPath}/eventlist`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(ResponseCodes.success);
      expect(response.body.success).to.be.true;
      expect(response.body.message).to.equal('List of events');
    });
  });
  describe(`GET eventList ${apiPath}/eventlist?dateFrom="${dateFrom}"&dateTo="${dateTo}"`, () => {
    it(`responds with message and statuscode ${ResponseCodes.success}`, async () => {
      const response = await request(app).get(`${apiPath}/eventlist/?dateFrom="${dateFrom}"&dateTo="${dateTo}"`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(ResponseCodes.success);
      expect(response.body.success).to.be.true;
      expect(response.body.message).to.equal('List of events');
    });
  });
  describe(`GET eventList ${apiPath}/eventlist/:organizationID`, () => {
    it(`responds with message and statuscode ${ResponseCodes.success}`, async () => {
      const response = await request(app).get(`${apiPath}/eventlist/${organizationID}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(ResponseCodes.success);
      expect(response.body.success).to.be.true;
      expect(response.body.message).to.equal('List of events');
    });
  });
  describe(`GET eventList ${apiPath}/eventlist/:organizationID?dateFrom="${dateFrom}"&dateTo="${dateTo}"`, () => {
    it(`responds with message and statuscode ${ResponseCodes.success}`, async () => {
      const response = await request(app).get(`${apiPath}/eventlist/${organizationID}?dateFrom="${dateFrom}"&dateTo="${dateTo}"`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(ResponseCodes.success);
      expect(response.body.success).to.be.true;
      expect(response.body.message).to.equal('List of events');
    });
  });
  /*
  describe(`GET event program ${apiPath}/program/:eventID`, () => {
    it(`responds with message and statuscode ${ResponseCodes.success}`, async () => {
      const response = await request(app).get(`${apiPath}/program/1`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(ResponseCodes.success);
      expect(response.body.success).to.be.true;
      expect(response.body.message).to.equal('Program of event');
    });
  });
  */
});