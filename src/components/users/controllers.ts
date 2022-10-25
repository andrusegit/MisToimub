import { Request, Response } from "express";
import ResponseCodes from "../../general.ts/responseCodes";
import { IUser } from "./interfaces";
import UserServices from "./services";
import authServices from "../authentication/services";
import authControllers from "../authentication/controller";


const UserControllers = {

  getUserList: (req: Request, res: Response) => {
    
    const userList : IUser[] = UserServices.getUserList();

    res.status(ResponseCodes.created).json({
      success: true,
      message: 'List of Users',
      userList
    }); 
  },

  addUser: async (req: Request, res: Response) => {
 
    const {
     name, email, password
    } = req.body;
    
    const passwordHash = await authServices.hash(password);

    const newUser: IUser = {
      id: -1,
      name: name,
      email : email,
      password: passwordHash,
      role: "User"
    }
    
    let result = UserServices.addUser(newUser);
    if (result > -1) {
      res.status(ResponseCodes.created).json({
        success: true,
        message: 'User added to list'
      }); 
    }
    else{
      res.status(ResponseCodes.badRequest).json({
      success: false,
      message: 'User was not added'
      }); 
    }
  },

  updateUser: async (req: Request, res: Response) => {
    
    const {
      id, name, email, password, role
     } = req.body;
  
    const passwordHash = await authServices.hash(password);

    const userData: IUser = {
      id: id,
      name: name,
      email : email,
      password: passwordHash,
      role: role
    }
  
    let result = UserServices.updateUser(userData);
    if (result > -1) {
      res.status(ResponseCodes.created).json({
        success: true,
        message: 'User updated'
      }); 
    }
    else{
      res.status(ResponseCodes.badRequest).json({
      success: false,
      message: 'user was not updated'
      }); 
    }
  },

  deleteUser: (req: Request, res: Response) => {
    let id = parseInt(req.params.id);

    let result = UserServices.deleteUser(id);

    if (result > -1) {
      res.status(ResponseCodes.success).json({
        success: true,
        message: 'User deleted from list'
        }); 
    }
     else {
      res.status(ResponseCodes.badRequest).json({
        success: false,
        message: 'User was not deleted'
        }); 
    }
  },

};

export default UserControllers;