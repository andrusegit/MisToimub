// NB!!! code for mysql2 testing purposes only
// necessary due to poor mysql2 documentation


import pool from './database';
import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';


interface IOrganization extends RowDataPacket 
{
  ID : number;
  name: string;
};


const test = { 

  selectRowData: async () => {
    const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query('SELECT name FROM User WHERE ID=1');
 
    const json: any = result;
 
    console.log("select test");
    console.log(json[0]);
    return result;
  },


  select: async () => {
    const [result]: [IOrganization[]/*ResultSetHeader*/, FieldPacket[]] = await pool.query('SELECT * FROM Organization');

    console.log("select test");
    console.log(result[1]);
    return result;
  },

  selecttry: async () => {
    
    let list : IOrganization[] = [];
    
    try {
      const [result]: [IOrganization[]/*ResultSetHeader*/, FieldPacket[]] = await pool.query('SELECT * FROM Organization');
      list = result;
    }
    catch (err) {

    }
    console.log("select test");
    console.log(list);

    //return list;
  },

  update: async () => {

    let xresult : any;

    try {
      const result = await pool.query('UPDATE User SET deleteDate=? WHERE id=?;', [new Date(), 1]);
      xresult = result[0];
      //console.log("inside try");
      //console.log(xresult.changedRows);
    }
    catch (err) {
      console.log("Do nothing on error");
    }

    console.log(xresult.changedRows);

    //console.log("update test");
    //console.log(result);
    //return result;
  
    // tagastad result.changedRows (mitu rida muudeti);
    // resultsetheader on veel insertId
    // errno annab numbri
    
    //err
    //errno annab mingi numbr
    //errcode anneb mingisuguse teksti kujul
    //sql annab tegeliku stringi
    //sqlMessage annab inimese kujul veateate
  
  } 

}

export default test;
