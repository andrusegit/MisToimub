
import { RowDataPacket } from 'mysql2';

interface INewUser {
  name: string,
  surname: string,
  email: string,
  password: string,
  admin: boolean,
  organizationID: number
};

interface IUser extends INewUser {
  ID: number
}

interface IUserSQL extends IUser, RowDataPacket {
  deleteDate: string
};

export { IUserSQL, INewUser, IUser};