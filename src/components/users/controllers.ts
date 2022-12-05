import { Request, Response } from "express";
import ResponseCodes from "../../general.ts/responseCodes";
import { /*IUser,*/ INewUser, IUser, IUserSQL } from "./interfaces";
import UserServices from "./services";
import authServices from "../authentication/services";
import authControllers from "../authentication/controller";


const UserControllers = {

  getUserList: async (req: Request, res: Response) => {
    
    const userList : IUser[] = await UserServices.getUserList();

    res.status(ResponseCodes.success).json({
      success: true,
      message: 'List of Users',
      userList
    }); 
  },

  getUser: async (req: Request, res: Response) => {
    let id = parseInt(req.params.id);

    let user = await UserServices.getUser(id);

    if (user != undefined) {
      res.status(ResponseCodes.success).json({
        success: true,
        message: 'User data',
        user
      });
    }
    else {
      res.status(ResponseCodes.badRequest).json({
        success: false,
        message: 'User was not found'
      });
    }
  },


  addUser: async (req: Request, res: Response) => {
 
    const {
     name, surname, email, password, organizationID
    } = req.body;
    
    const admin = false;

    const newUser : INewUser = {
      name, surname, email, password, admin,  organizationID
    };

    let insertId = await UserServices.addUser(newUser);

    if (insertId > 0) {
      res.status(ResponseCodes.created).json({
        success: true,
        message: 'User added to list'
      });
    }
    else {
      res.status(ResponseCodes.badRequest).json({
        success: false,
        message: 'Something went wrong, user was not added'
      })}

  },

  updateUser: async (req: Request, res: Response) => {
    
    const {
      ID, name, surname, email, password, admin, organizationID, deleteDate
     } = req.body;
  
    const userData: IUser = {
      ID,
      name,
      surname, 
      email,
      password,
      admin,
      organizationID
    }
  
    let changedRows = await UserServices.updateUser(userData);

    if (changedRows > 0) {
      res.status(ResponseCodes.success).json({
        success: true,
        message: 'User updated'
      });
    }
    else {
      res.status(ResponseCodes.badRequest).json({
        success: false,
        message: 'Something went wrong, user was not updated'
      });
    }
  },

  deleteUser: async (req: Request, res: Response) => {
    let id = parseInt(req.params.id);

    let changedRows = await UserServices.deleteUser(id);

    if (changedRows > 0) {
      res.status(ResponseCodes.success).json({
        success: true,
        message: 'User deleted from list'
      });
    }
    else {
      res.status(ResponseCodes.badRequest).json({
        success: false,
        message: 'Something went wrong, user was not deleted'
      });
    }
  },

};

export default UserControllers;