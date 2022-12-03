import { IProgram, INewProgram, IProgramSQL } from "./interfaces";
import pool from '../../database';
import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';

const ProgramServices = {
    
  
  getProgramByEvent: async (eventID: number): Promise<IProgram[] | undefined> => {
    let list : IProgram[] = [];

    try {
      const [result]: [IProgramSQL[], FieldPacket[]] = await pool.query(`SELECT * FROM Program WHERE eventID=?`, eventID);
      list = result;
    }
    catch (err) {
      console.log("getProgramByEvent: " + err);
    }

    return list;
  },

  getProgramItem: async (eventID:number, id: number) : Promise<IProgram |undefined> => {
    
    let item : IProgram | undefined

    try {
      const [result]: [IProgramSQL[], FieldPacket[]] = await pool.query(`SELECT * FROM Program WHERE eventID=? AND ID=?`, [eventID, id]);
      item = result[0];
    }
    catch (err) {
      console.log("getProgramItem: " + err);
    }

    return item;
  },

  getProgram: async (id: number): Promise<IProgram | undefined> => {
    let program: IProgram | undefined;
      
    try {
      const [result]: [IProgramSQL[], FieldPacket[]] = await pool.query('SELECT * FROM Program WHERE ID=?', [id]);
      program = result[0];
    }
    catch (err) {
      console.log("getProgram: " + err);
    }

    return program;
  },

    addProgram: async (newProgram: INewProgram) : Promise<number> => {
 
      let json : any;
      let insertId : number = 0;
  
      const program : INewProgram = {
        eventID: newProgram.eventID,
        name: newProgram.name,
        description: newProgram.description,
        startTime: newProgram.startTime
      }
      
      try {
        const result = await pool.query('INSERT INTO Program SET ?', newProgram);
        json = result[0];
        insertId = json.insertId;
      }
      catch (err) {
        console.log("addProgram: " + err);
      }
  
      return insertId;
  
    },
  
    updateProgram: async (programData : IProgram): Promise<number> => {
      
      let json : any;
      let changedRows : number = 0;
  
      const program : IProgram = {
        ID: programData.ID,
        eventID: programData.eventID,
        name: programData.name,
        description: programData.description,
        startTime: programData.startTime
        }
      
      try {
        const result = await pool.query('UPDATE Program SET ? WHERE ID=?', [program, program.ID]);
        json = result[0];
        changedRows = json.changedRows;
      }
      catch (err) {
        console.log("updateProgram: " + err);
      }
      return changedRows;
  
    },

    deleteProgram: async (programId: number) => {

      let json : any;
      let changedRows : number = 0;
  
      try {
        const result = await pool.query('UPDATE Program SET deleteDate=? WHERE id=?;', [new Date(), programId]);
        json = result;
        changedRows = json.changedRows;
      }
      catch (err) {
        console.log("deleteProgram:" + err);
      }
      return changedRows;
    },
  
    getProgramEventOrganization: async (programEventID: number): Promise<number> => {
      const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query('SELECT OrganizationID FROM Event WHERE ID=?', [programEventID]);
      let json: any = result;
      return json[0].OrganizationID;
    }
  
  
  };


  export default ProgramServices;