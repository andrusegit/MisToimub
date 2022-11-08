import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../apiConfig';
import { IUser, IUserSQL } from '../users/interfaces';


const authServices = {
  hash: async (password: string): Promise<string> => {
      const hash = await bcrypt.hash(password, config.saltRounds);
      return hash;
  },

  compare: async (password: string, hash: string): Promise<Boolean> => {
    const match = await bcrypt.compare(password, hash);
    return match;
  },

  signin: async (user: IUserSQL): Promise<string> => {
    const payload = {
      id: user.id,
      email: user.email,
      organization: user.organizationID,
      role: user.admin ? 'Admin' : 'User'
    }
    const token = await jwt.sign(payload, config.jwtSecret, {expiresIn: '2h'});
    return token;
  },

  verify: async (token: string) => {
    const verified = await jwt.verify(token, config.jwtSecret);
    return verified;
  }
};

export default authServices;

