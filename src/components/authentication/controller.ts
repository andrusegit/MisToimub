import { Request, Response } from "express";
import usersServices from "../users/services";
import authServices from "./services";
import ResponseCodes from "../../general.ts/responseCodes";


const NOTFOUND = -1;

const authControllers = {
  login: async (req: Request, res: Response) => {
    const {email, password} = req.body;

    //res.set('Access-Control-Allow-Origin', '*');

    if (!email || !password) {
      return res.status(ResponseCodes.badRequest).json({
        success: false,
        message: "Email or password are missing"
      });
    }
    
    const user = await usersServices.findUserByEmail(email);
    
    if (user == undefined) {
      return res.status(ResponseCodes.notFound).json({
        success: false,
        message: "User not found"
      });
    }

    const match = await authServices.compare(password, user.password);
    if (!match) {
      return res.status(ResponseCodes.notFound).json({
        success: false,
        message: "Wrong password"
      })
    }
    const token = await authServices.signin(user);
    return res.status(ResponseCodes.success).json({
      success: true,
      message: "token",
      token
    })
  }
};

export default authControllers;