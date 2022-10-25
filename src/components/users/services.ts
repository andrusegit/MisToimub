import { IUser } from "./interfaces"
import { users } from "../../../mockdata"

const NOTFOUND = -1;

const UserServices = {
  getUserList: () : IUser[] => {
    return users;
  },

  addUser: (newUser: IUser) => {
    let newId = -1; // if no records, then next id will be 0

    users.forEach((element) => {
      newId = Math.max(newId, element.id);
    });
  
    newId++;
    users.push(newUser);

    return newId;
  },

  updateUser: (userData : IUser) => {
    
    const index = users.findIndex((element) => {
      return element.id == userData.id
    });
 
    if (index > NOTFOUND) 
      users[index] = userData;
    
    return index;
  },

  deleteUser: (userId: number) => {
    const index = users.findIndex((element) => {
        return element.id == userId;
    });

    if (index > NOTFOUND)
      users.splice(index, 1);
    
    return index;
  },

  findUserByEmail: (email: string): IUser | undefined => {

    const userData: IUser | undefined = users.find((element) => { return element.email == email; });
    return userData;
  },

  findUserById: (id: number): number => {

    const index = users.findIndex((element) => {
      return element.id == id
    })
    
    return index;
  },

  isUserExists: (id: number): boolean => {
    
    if (UserServices.findUserById(id) != NOTFOUND)
      return true;
    else
      return false;
  },

    
};

export default UserServices;