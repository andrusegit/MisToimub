import { IUser } from "./interfaces"
import { user } from "../../../mockdata"

const UserServices = {
  getUserList: () : IUser[] => {
    return user;
  },

  addUser: (newUser: IUser) => {
    let maxId = -1;

    user.forEach((element) => {
      if(element.id > maxId)
        maxId = element.id;
    });
  
    let id = maxId + 1;

    newUser.id = id;
    
    user.push(newUser);

    return id;
  },

  updateUser: (userData : IUser) => {
      
    let index = -1;
    user.forEach((element, i)  => {
      if (element.id == userData.id)
        index = i;
    });

    if (index > -1) 
      user[index] = userData;
    
      return index;
  },

  deleteUser: (userId: number) => {
    let index = -1;
    user.forEach((element, i) => {
      if(element.id == userId)
        index = i; 
    });

    if (index > -1)
      user.splice(index, 1);
    
    return index;

  },

};

export default UserServices;