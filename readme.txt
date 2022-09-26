npm init -y
npm install typescript

tsconfig.json faili (typescripti seaded) loomine: npx tsc --init või loo käsitsi ja kopeeri sinna sisse:

npm install @types/node --save-dev




npm install --save-dev ts-node nodemon

{
  "watch": ["src"], // Kaust, mille sees olevate failide muudatusi jälgitakse
  "ext": ".ts,.js", // Failide laiendid, mille muudatusi jälgitakse
  "ignore": [],
  "exec": "ts-node ./src/index.ts" // Käivitamise käsk
}

Lisa package.json faili "script" jaotisesse:
"scripts": {
    "build": "tsc",
    "start": "nodemon"
},



index.ts fail:

import express, { Request, Response, Express } from 'express';

const app: Express = express();
const port: number = 3000;

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Hello world!',
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App is running on port ${port}`);
});


Käivita npm start













GET - määratud ressursi pärimine (näiteks GET /api/excuses tagastab vabanduste nimekirja)
POST - määratud ressursile üksuse edastamine (näiteks POST /api/excuses päringuga saadetakse vabanduste andmed uue vabanduse lisamiseks andmebaasi)
PATCH - määratud ressursile üksuse edastamine olemasoleva üksuse muutmiseks (näiteks PATCH /api/excuses/:id päringuga saadetakse kaasa andmed määratud id-ga vabanduse andmete muutmiseks)
DELETE - kustutab määratud ressursi (näiteks DELETE /api/excuses/:id kustutab vabanduse määratud id-ga)

Edukad:
200 - OK - Päring õnnestus ja tagastatakse sisu.
201 - Created - Uus ressurss on loodud (vastus saadetakse pärast seda, kui uus ressurss on loodud ja vastus peaks sisaldama infot uue ressursi kohta - näiteks loodud ressursi id)
204 - No Content  - Päring õnnestus, server on teinud oma toimingud, kuid ei ole vaja midagi tagastada.
Vead
400 - Bad request - Server ei saa päringut töödelda või ei hakka seda töötama kliendi veana peetava asja tõttu.
401 - Unauthorized - Päring nõuab kasutaja autentimist.
403 - Forbidden - Server mõistis taotlust, kuid keeldub seda täitmast.
404 - Not Found - Server ei leia soovitud ressurssi.
Serveri vead
500 - Internal Server Error - Serveril tekkis ootamatu probleem, mis takistas tal päringut täitmast.


























Kood:
//console.log('Hello world!');
import express, { Request, Response } from 'express';
const app = express();
const PORT = 3000;

app.use(express.json()); //võtab request objektist info ja loob vastava kirje (POST korral);

interface INewUser { // I näitab, et tegemist on interfacega
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface IUser extends INewUser {
  id: number;
}

const users: IUser[] = [
  {
  id:1,
  firstName : "Juhan",
  lastName: "Juurikas",
  email: "juhan@juurikas.ee",
  password: "juhan",}, 

];

app.get("/api/v1/users", (req: Request, res: Response) => {  // parameetriks koht, kust tulevad päringud / on juur 
  // ja callback funktsioon parameetriteks request ja response
  // Request ja Response muutujatüübid tulevad @types/express

  res.status(200).json({
    success: true,
    message: "List of users",
    users
    //message: users,
    // users: users
  }); // serveri vastus, et kõik on hästi, json objekti vastus, mis tagasi saata

}); 

app.listen(PORT, () => { // esimene argument pordi number, ja callback funktsioon
  console.log("Server is running"); 
}) 


app.post("/api/v1/users", (req: Request, res: Response) => { 
  const {firstName, lastName, email, password} = req.body; // objekti destruktureerimine
  const id = users.length + 1;

  const newUser: IUser = {
    id,
    firstName,
    lastName,
    email,
    password
  };


  users.push(newUser);

  res.status(200).json({
    success: true,
    message: `User wiht email ${newUser.email} created`,
    //message: users,
    // users: users
  }); // serveri vastus, et kõik on hästi, json objekti vastus, mis tagasi saata

});

app.delete("/api/v1/users:id", (req: Request, res: Response) => { //:id refineerib muutuja
  const id = parseInt(req.params.id);

  const index = users.findIndex(element => {element.id===id})

  if (!index) {
      return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  users.splice(index, 1); 
  
    return res.status(200).json({
      success: true,
      message: `User deleted`,
    });
});

