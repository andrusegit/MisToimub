import { user } from "../../../mockdata";


const userQueries = {
  userExists(userId: number) {

    let result = false;

    user.forEach((element) => {
      if(element.id == userId) 
        result = true;
    });
    return result;
  },
}

export default userQueries;