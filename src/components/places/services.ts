import { IPlace, INewPlace, IPlaceSQL } from "./interfaces";
import pool from '../../database';
import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';

const PlaceServices = {
    
  getPlaceList: async () : Promise<IPlace[]> => {
    
    let list : IPlace[] = [];

    try {
      const [result]: [IPlaceSQL[], FieldPacket[]] = await pool.query(`SELECT * FROM Place`);
      list = result;
    }
    catch (err) {
      console.log("getPlaceList: " + err);
    }

    return list;
  },

  getPlace: async (id: number): Promise<IPlace | undefined> => {
    let place: IPlace | undefined;
      
    try {
      const [result]: [IPlaceSQL[], FieldPacket[]] = await pool.query('SELECT * FROM Place WHERE ID=?', [id]);
      place = result[0];
    }
    catch (err) {
      console.log("getPlace: " + err);
    }

    return place;
  },

    addPlace: async (newPlace: INewPlace) : Promise<number> => {
 
      let json : any;
      let insertId : number = 0;
  
      const place : INewPlace = {
        name: newPlace.name,
        address: newPlace.address,
      }
      
      try {
        const result = await pool.query('INSERT INTO Place SET ?', newPlace);
        json = result[0];
        insertId = json.insertId;
      }
      catch (err) {
        console.log("addPlace: " + err);
      }
  
      return insertId;
  
    },
  
    updatePlace: async (placeData : IPlace): Promise<number> => {
      
      let json : any;
      let changedRows : number = 0;
  
      const place : IPlace = {
        ID: placeData.ID,
        name: placeData.name,
        address: placeData.address,
        }
      
      try {
        const result = await pool.query('UPDATE Place SET ? WHERE ID=?', [place, place.ID]);
        json = result[0];
        changedRows = json.changedRows;
      }
      catch (err) {
        console.log("updatePlace: " + err);
      }
      return changedRows;
  
    },

    deletePlace: async (placeId: number) => {

      let json : any;
      let changedRows : number = 0;
  
      try {
        const result = await pool.query('UPDATE Place SET deleteDate=? WHERE id=?;', [new Date(), placeId]);
        json = result;
        changedRows = json.changedRows;
      }
      catch (err) {
        console.log("deletePlace:" + err);
      }
      return changedRows;
    },
  };


  export default PlaceServices;