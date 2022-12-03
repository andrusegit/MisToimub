import request from 'supertest';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import app from '../src/app';
import config from '../src/apiConfig';
import ResponseCodes from "../src/general.ts/responseCodes";

const { apiPath } = config; 

let adminToken = "";
let userToken = "";

const missingUser = {
  email: 'wrog@wrong.ee',
  password: '',
};

const wrongUser = {
  email: 'wrog@wrong.ee',
  password: 'wrongpassword',
};

const adminUser = {
  email: 'andrus@tlu.ee',
  password: 'dontellya',
};

const user = {
  email: 'arabella@xxx.ee',
  password: 'dontellya',
};

const newUserMissingData = {
  email: 'kass.artur@mail.ee',
  password: 'whatever',
};

const newUser = {
  name: "Artur",
  surname: "Kass",
  email: 'kass.artur@mail.ee',
  password: 'whatever',
  organizationID: 1
};

const testUserUpdate = {
  ID: 1,
  name: "Test",
  surname: "Test"+Math.random(),
  email: 'test@test.ee',
  password: 'aööslkdfjöakdföaskdfasidjföaskdföaskldnöaskdfnöasldkfnöasldkfnöasdfnö',
  organizationID: 1
};

const testUserID = 1;

describe('Login controller', () => {
  describe(`POST ${apiPath}/login`, () => {
    it(`responds with error message and statusCode ${ResponseCodes.badRequest}`, async () => {
      const response = await request(app).post(`${apiPath}/login`).send(missingUser);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(ResponseCodes.badRequest);
      expect(response.body.success).to.be.false;
      expect(response.body.message).to.equal('Email or password are missing');
    });
    it(`responds with error message and statusCode ${ResponseCodes.notFound}`, async () => {
      const response = await request(app).post(`${apiPath}/login`).send(wrongUser);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(ResponseCodes.notFound);
      expect(response.body.success).to.be.false;
      expect(response.body.message).to.equal('User not found');
    });
    it(`sends statuscode and token ${ResponseCodes.success}`, async () => {
      const response = await request(app).post(`${apiPath}/login`).send(adminUser);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(ResponseCodes.success);
      expect(response.body.success).to.be.true;
      expect(response.body.message).to.equal('token');
      expect(response.body.token).to.be.a('string');
      adminToken = response.body.token;
    });
    it(`sends statuscode and token ${ResponseCodes.success}`, async () => {
      const response = await request(app).post(`${apiPath}/login`).send(user);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(ResponseCodes.success);
      expect(response.body.success).to.be.true;
      expect(response.body.message).to.equal('token');
      expect(response.body.token).to.be.a('string');
      userToken = response.body.token;
    });
  });
});
 
      
  describe(`GET ${apiPath}/users`, () => {
    it(`Gets users list ${ResponseCodes.success}`, async () => {
      
      const response = await request(app).get(`${apiPath}/users`).set('Authorization', 'bearer ' + adminToken);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(ResponseCodes.success);
      expect(response.body.success).to.be.true;
      expect(response.body.message).to.equal("List of Users");
      expect(response.body.userList).to.be.a('array');
    });
    it(`Gets users list ${ResponseCodes.unauthorized}`, async () => {
      const response = await request(app).get(`${apiPath}/users`).set('Authorization', 'bearer ' + userToken);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(ResponseCodes.unauthorized);
      expect(response.body.success).to.be.false;
    });
    it(`Gets users list ${ResponseCodes.unauthorized}`, async () => {
      const response = await request(app).get(`${apiPath}/users`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(ResponseCodes.unauthorized);
      expect(response.body.success).to.be.false;
    });

  describe("Users tests", () => { 
    describe(`PUT ${apiPath}/users`, () => {
      it(`Add user with missing data ${ResponseCodes.badRequest}`, async () => {
        const response = await request(app).put(`${apiPath}/users`).send(newUserMissingData);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(ResponseCodes.badRequest);
        expect(response.body.success).to.be.false;
      });
      /*
      it(`Add user to list ${ResponseCodes.created}`, async () => {
        const response = await request(app).put(`${apiPath}/users`).send(newUser);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(ResponseCodes.created);
        expect(response.body.success).to.be.true;
        });
      */
      });
    });
  });
  
  describe(`GET ${apiPath}/users/${testUserID}`, () => {
      it(`Get test user ${ResponseCodes.success}`, async () => {
        const response = await request(app).get(`${apiPath}/users/${testUserID}`).set('Authorization', 'bearer ' + adminToken);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(ResponseCodes.success);
        expect(response.body.success).to.be.true;
      });
  });

  describe(`POST ${apiPath}/users/`, () => {
    it(`Update test user ${ResponseCodes.success}`, async () => {
      const response = await request(app).post(`${apiPath}/users/`).send(testUserUpdate).set('Authorization', 'bearer ' + adminToken);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(ResponseCodes.success);
      expect(response.body.success).to.be.true;
    });
    
  });

  describe(`DELETE ${apiPath}/users/${testUserID}`, () => {
    it(`Delete test user ${ResponseCodes.success}`, async () => {
      const response = await request(app).delete(`${apiPath}/users/${testUserID}`).set('Authorization', 'bearer ' + adminToken);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(ResponseCodes.success);
      expect(response.body.success).to.be.true;
    });
  });
  
  /*
  describe(`POST ${apiPath}/users`, () => {
    it(`Update user without authorization ${ResponseCodes.badRequest}`, async () => {
      const response = await request(app).post(`${apiPath}/users`).send(newUserMissingData);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(ResponseCodes.badRequest);
      expect(response.body.success).to.be.false;
    });
    it(`Update User ${ResponseCodes.badRequest}`, async () => {
      const response = await request(app).put(`${apiPath}/users`).send(newUserMissingData);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(ResponseCodes.badRequest);
      expect(response.body.success).to.be.false;
    });
    it(`Add user to list ${ResponseCodes.created}`, async () => {
      const response = await request(app).put(`${apiPath}/users`).send(newUser);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(ResponseCodes.created);
      expect(response.body.success).to.be.true;
      newUserId = response.body.userId;
    });
  });
*/
