import { Request, Response } from "express";
import ResponseCodes from "../../general.ts/responseCodes";
import { IPlace, INewPlace } from "./interfaces";
import PlaceServices from "./services";


const PlaceControllers = {
  getPlaceList: async (req: Request, res: Response) => {
    
    const placeList : IPlace[] = await PlaceServices.getPlaceList();
    
    res.status(ResponseCodes.success).json({
      success: true,
      message: 'List of places',
      placeList
    });    
  },


  getPlace: async (req: Request, res: Response) => {
    let id = parseInt(req.params.id);

    const place: IPlace | undefined = await PlaceServices.getPlace(id);

    if (place != undefined) {
      res.status(ResponseCodes.success).json({
        success: true,
        message: 'Selected places',
        place
      });
    }
    else {
      res.status(ResponseCodes.badRequest).json({
        success: false,
        message: 'No such place',
      });
    }   
    
  },

  addPlace: async (req: Request, res: Response) => {
 
    let userId = res.locals.user.id;

    const {  
      name, address
    } = req.body;
    
    const newPlace: INewPlace = {
      name: name,
      address: address
    }
    
    let insertId = await PlaceServices.addPlace(newPlace);

    if (insertId > 0) {
      res.status(ResponseCodes.created).json({
        success: true,
        message: 'Place added to list'
      });
    }
    else {
      res.status(ResponseCodes.badRequest).json({
        success: false,
        message: 'Something went wrong, place was not added'
      })}

  },

  updatePlace: async (req: Request, res: Response) => {

    const {  
      ID, name, address
    } = req.body;
    
    const place: IPlace = {
      ID: ID,
      name: name,
      address: address
    }
    
    let changedRows = await PlaceServices.updatePlace(place);

    if (changedRows > 0) {
      res.status(ResponseCodes.created).json({
        success: true,
        message: 'Place updated'
      });
    }
    else {
      res.status(ResponseCodes.badRequest).json({
        success: false,
        message: 'Something went wrong, place was not updated'
      })}
  },

  deletePlace: async (req: Request, res: Response) => {
    let id = parseInt(req.params.id);

    let changedRows = await PlaceServices.deletePlace(id);

    if (changedRows > 0) {
      res.status(ResponseCodes.success).json({
        success: true,
        message: 'Place deleted from list'
      });
    }
    else {
      res.status(ResponseCodes.badRequest).json({
        success: false,
        message: 'Something went wrong, place was not updated'
      });
    }
  },

}

export default PlaceControllers;