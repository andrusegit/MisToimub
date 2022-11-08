import { RowDataPacket } from 'mysql2';

interface INewPlace {
  name: string,
  address: string,
};

interface IPlace extends INewPlace {
  ID: number
}

interface IPlaceSQL extends IPlace, RowDataPacket {
  deleteDate: String
}


export { INewPlace, IPlace, IPlaceSQL };