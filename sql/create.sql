CREATE DATABASE MisToimub;

USE MisToimub;

CREATE TABLE Organization (
	ID INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (ID)
);

CREATE TABLE User (
	ID INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    surname VARCHAR(30) NOT NULL,
	email VARCHAR(30) NOT NULL,
    password VARCHAR(300) NOT NULL,
    admin BOOLEAN DEFAULT FALSE,
    organizationID INTEGER,
    deleteDate DATETIME,
	PRIMARY KEY (ID),
    UNIQUE KEY (email),
    FOREIGN KEY (organizationID) REFERENCES Organization(ID)
);

CREATE TABLE EventType (
	ID INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (ID)
);

CREATE TABLE Place (
	ID INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    address VARCHAR(50),
    deleteDate DATETIME,
    PRIMARY KEY (ID)
);

CREATE TABLE Event (
	ID INTEGER NOT NULL AUTO_INCREMENT,
    organizationID INTEGER NOT NULL,
    eventTypeID INTEGER,
    eventName VARCHAR(30) NOT NULL,
    description VARCHAR(300),
    startTime DATETIME,
    placeID INTEGER,
    placeDescription VARCHAR(50),
    public BOOLEAN DEFAULT FALSE,
    ticketPrice DECIMAL(10,2),
    ticketSaleOnLine VARCHAR(256),
    ticketSaleAtDoor BOOLEAN,
    deleteDate DATETIME,
    PRIMARY KEY (ID),
    INDEX (organizationID),
    INDEX (startTime),
    FOREIGN KEY (organizationID) REFERENCES Organization(ID),
    FOREIGN KEY (eventTypeID) REFERENCES EventType(ID),
    FOREIGN KEY (placeID) REFERENCES Place(ID)
);

CREATE TABLE Program (
	ID INTEGER NOT NULL AUTO_INCREMENT,
    eventID INTEGER NOT NULL,
    name VARCHAR(30) NOT NULL,
    description VARCHAR(300),
    startTime DATETIME,
    deleteDate DATETIME,
    PRIMARY KEY (ID),
    INDEX (eventID),
    INDEX (startTime),
    FOREIGN KEY (eventID) REFERENCES Event(ID)
);

