CREATE DATABASE MisToimub;

USE MisToimub;

CREATE TABLE Organization (
	ID INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (ID)
);

CREATE TABLE User (
	ID INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    surname VARCHAR(30),
	email VARCHAR(30),
    password VARCHAR(300),
    admin BOOLEAN,
    organizationID INTEGER,
    deleteDate DATETIME,
	PRIMARY KEY (ID),
    FOREIGN KEY (organizationID) REFERENCES Organization(ID)
);

CREATE TABLE EventType (
	ID INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (ID)
);

CREATE TABLE Place (
	ID INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    address VARCHAR(50),
    deleteDate DATETIME,
    PRIMARY KEY (ID)
);

CREATE TABLE Status (
	ID INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(20),
	PRIMARY KEY (ID)
);


CREATE TABLE Event (
	ID INTEGER NOT NULL AUTO_INCREMENT,
    organizationID INTEGER,
    eventTypeID INTEGER,
    eventName VARCHAR(30),
    description VARCHAR(300),
    startTime DATETIME,
    placeID INTEGER,
    placeDescription VARCHAR(50),
    statusID INTEGER,
    ticketPrice DECIMAL(10,2),
    ticketSaleOnLine VARCHAR(256),
    ticketSaleAtDoor BOOLEAN,
    deleteDate DATETIME,
    PRIMARY KEY (ID),
    FOREIGN KEY (organizationID) REFERENCES Organization(ID),
    FOREIGN KEY (eventTypeID) REFERENCES EventType(ID),
    FOREIGN KEY (placeID) REFERENCES Place(ID),
    FOREIGN KEY (statusID) REFERENCES Status(ID)
);

CREATE TABLE Program (
	ID INTEGER NOT NULL AUTO_INCREMENT,
    eventID INTEGER,
    name VARCHAR(30),
    description VARCHAR(300),
    startTime DATETIME,
    deleteDate DATE
    PRIMARY KEY (ID),
    FOREIGN KEY (eventID) REFERENCES Event(ID)
);

