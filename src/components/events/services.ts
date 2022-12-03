  import {EventStatus, IEvent, INewEvent, IEventSQL } from "./interfaces";
  import pool from '../../database';
  import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';

  const NOTFOUND : number = -1,
  MINDATE: string = "0000-01-01",
  MAXDATE: string = "9999-12-31" 

  const EventServices = {
    
    getEventList: async (params: {[key: string]: any}) : Promise<IEvent[]> => {
      
      let list : IEvent[] = [];
      let sqlString: string = "SELECT * FROM Event WHERE deleteDate IS NULL"
      let sqlParams = [];


      if ("organizationID" in params) {
        sqlString += " AND organizationID=?";
        sqlParams.push(params.organizationID);
      }

      if ("statusID" in params) {
        sqlString += " AND statusID=?";
        sqlParams.push(params.statusID);
      }
      else {
        sqlString += " AND statusID>0";
      }
      
      if ("dateFrom" in params) {
        sqlString += " AND startTime>=?";
        sqlParams.push(new Date(params.dateFrom));
      }

      if ("dateTo" in params) {
        sqlString += " AND startTime<=?";
        sqlParams.push(new Date(params.dateTo));
      }

      sqlString += " ORDER BY startTime;";

      try {
        const [result]: [IEventSQL[], FieldPacket[]] = await pool.query(sqlString, sqlParams);
        list = result;
      }
      catch (err) {
        console.log("getEventList: " + err);
      }

      list.forEach(element => {
        let date = new Date(element.startTime);
        element.startTime = date.toISOString().substring(0, 16).replace('T', ' ');
      });

      return list;
    },

    getEvent: async (id: number): Promise<IEvent | undefined> => {
      let event: IEvent | undefined;
      
      try {
        const [result]: [IEventSQL[], FieldPacket[]] = await pool.query('SELECT * FROM Event WHERE ID=?', [id]);
        event = result[0];
        let date = new Date(event.startTime);
        event.startTime = date.toISOString().substring(0, 16).replace('T', ' ');  
      }
      catch (err) {
        console.log("getEvent: " + err);
      }

      return event;
    },

    addEvent: async (newEvent: INewEvent) : Promise<number> => {
 
      let json : any;
      let insertId : number = 0;
  
      const event : INewEvent = {
        organizationID: newEvent.organizationID,
        eventTypeID: newEvent.eventTypeID,
        eventName: newEvent.eventName,
        description: newEvent.description,
        startTime: newEvent.startTime,
        placeID: newEvent.placeID,
        placeDescription: newEvent.placeDescription,
        public: newEvent.public,
        ticketPrice: newEvent.ticketPrice,
        ticketSaleOnLine: newEvent.ticketSaleOnLine,
        ticketSaleAtDoor: newEvent.ticketSaleAtDoor,
      }
      
      try {
        const result = await pool.query('INSERT INTO Event SET ?', newEvent);
        json = result[0];
        insertId = json.insertId;
      }
      catch (err) {
        console.log("addEvent: " + err);
      }
  
      return insertId;
  
    },
  
    updateEvent: async (eventData : IEvent): Promise<number> => {
      
      let json : any;
      let changedRows : number = 0;
  
      const event : IEvent = {
        ID: eventData.ID,
        organizationID: eventData.organizationID,
        eventTypeID: eventData.eventTypeID,
        eventName: eventData.eventName,
        description: eventData.description,
        startTime: eventData.startTime,
        placeID: eventData.placeID,
        placeDescription: eventData.placeDescription,
        public: eventData.public,
        ticketPrice: eventData.ticketPrice,
        ticketSaleOnLine: eventData.ticketSaleOnLine,
        ticketSaleAtDoor: eventData.ticketSaleAtDoor
      }
      
      try {
        const result = await pool.query('UPDATE Event SET ? WHERE ID=?', [event, event.ID]);
        json = result[0];
        changedRows = json.changedRows;
      }
      catch (err) {
        console.log("updateEvent: " + err);
      }
      
      return changedRows;
  
    },

    deleteEvent: async (eventId: number) => {

      let json : any;
      let changedRows : number = 0;
  
      try {
        const result = await pool.query('UPDATE Event SET deleteDate=? WHERE id=?;', [new Date(), eventId]);
        json = result[0];
        changedRows = json.changedRows;
      }
      catch (err) {
        console.log("deleteEvent:" + err);
      }

      return changedRows;
    },
  };


  export default EventServices;