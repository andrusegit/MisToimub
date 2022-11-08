import authServices from "../authentication/services";
import { INewUser, IUser, IUserSQL } from "./interfaces"
import pool from '../../database';
import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';


const UserServices = {
  getUserList: async () : Promise<IUser[]> => {
    
    let list : IUser[] = [];

    try {
      const [result]: [IUserSQL[], FieldPacket[]] = await pool.query('SELECT * FROM User');
      list = result;
    }
    catch (err) {
      console.log("getUserList: " + err);
    }

    return list;
  },

  addUser: async (newUser: INewUser) : Promise<number> => {
 
    let json : any;
    let insertId : number = 0;

    const passwordHash = await authServices.hash(newUser.password);

    const user: INewUser = {
      name: newUser.name,
      surname: newUser.surname,
      email : newUser.email,
      password: passwordHash,
      admin: false,
      organizationID: newUser.organizationID
    }

    try {
      const result = await pool.query('INSERT INTO User SET ?', newUser);
      json = result[0];
      insertId = json.insertId;
    }
    catch (err) {
      console.log("adduser: " + err);
    }

    return insertId;

  },

  updateUser: async (userData : IUser): Promise<number> => {
    
    let json : any;
    let changedRows : number = 0;

    const passwordHash = await authServices.hash(userData.password);
    const admin = false;

    const user: IUser = {
      ID: userData.ID,
      name: userData.name,
      surname: userData.surname,
      email : userData.email,
      password: passwordHash,
      admin: admin,
      organizationID: userData.organizationID
    };
    
    try {
      const result = await pool.query('UPDATE User SET ? WHERE ID=?', [user, user.ID]);
      json = result[0];
      changedRows = json.changedRows;
    }
    catch (err) {
      console.log("updateUser: " + err);
    }
    return changedRows;

  },

  deleteUser: async (userId: number) => {

    let json : any;
    let changedRows : number = 0;

    try {
      const result = await pool.query('UPDATE User SET deleteDate=? WHERE id=?;', [new Date(), userId]);
      json = result;
      changedRows = json.changedRows;
    }
    catch (err) {
      console.log("deleteUser:" + err);
    }
    return changedRows;
  },

 
  findUserByEmail: async (email: string): Promise<IUserSQL | undefined> => {

    let user : IUserSQL | undefined = undefined; 
    try {
      const [result]: [IUserSQL[], FieldPacket[]] = await pool.query('SELECT * FROM User WHERE deleteDate IS NULL AND email=?', [email]);
      user = result[0];
    }
    catch (err) {
      console.log("findUserByEmail: " + err);
    }

    return user;
  },

  isUserExists: async (id: number): Promise<boolean> => {
   
    let userExists = false;

    try {
      const [result]: [IUserSQL[], FieldPacket[]] = await pool.query('SELECT * FROM User WHERE deleteDate IS NULL AND ID=?', [id]);
      if (result[0].length > 0)
        userExists = true;
      else
        userExists = false;
    }
    catch (err) {
      console.log("isUserExists: " + err);
    }

    return userExists;
  },
};

export default UserServices;