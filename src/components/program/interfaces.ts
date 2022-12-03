import { RowDataPacket } from 'mysql2';

interface INewProgram {
  eventID: number,
  name: string,
  description: string,
  startTime: string,
};

interface IProgram extends INewProgram {
  ID: number
}

interface IProgramSQL extends IProgram, RowDataPacket {
  deleteDate: String
}


export { INewProgram, IProgram, IProgramSQL };
