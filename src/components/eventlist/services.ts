  import { IEventListEvent, IEventListEventSQL, IEventProgram, IEventProgramSQL } from "./interfaces";
  import pool from '../../database';
  import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';

  const NOTFOUND : number = -1,
  MINDATE: string = "0000-01-01", // peaks olemma tänane kuupäev
  MAXDATE: string = "9999-12-31" 

  const EventListServices = {
    
    getEventList: async (params: {[key: string]: any}) : Promise<IEventListEvent[]> => {
      
      let list : IEventListEvent[] = [];
      let sqlString: string = "SELECT * FROM EventList"
      let sqlParams = [];


      if ("organizationID" in params) {
        sqlString += " AND organizationID=?";
        sqlParams.push(params.organizationID);
      }
      
      if ("dateFrom" in params) {
        sqlString += " AND startTime>=?";
        sqlParams.push(new Date(params.dateFrom));
      }

      if ("dateTo" in params) {
        sqlString += " AND startTime<=?";
        sqlParams.push(new Date(params.dateTo));
      }

      try {
        const [result]: [IEventListEventSQL[], FieldPacket[]] = await pool.query(sqlString, sqlParams);
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
    }
  };
  

  export default EventListServices;