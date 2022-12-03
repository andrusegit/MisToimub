# MisToimub

MisToimub on õppeotstarbel loodud tarkvara ja seetõttu mitte tavapäraseks kasutamiseks

Tarkvara eesmärgiks on luua serveri tarkvara linna ürituste kava haldamiseks.
Kasutajateks oleksid ürituste korraldajad, kes saavad oma üritusi läbi selle kava reklaamida.
Kava on võimalik kasutada ka planeerimiseks, kuna sinna saab lisada ka üritusi, mis ei ole
veel välja kuulutatud, kuid on planeerimisel. See aitaks vältida sarnaste ürituste planeerimist
samale ajale.

## API

Läbi API saavad selle kava lisada oma kodulehele ka näiteks hotellid, kes saavad oma külastajale pakkuda ülevaadet linnas toimuva kohta. Samuti saaks seda oma kodulehel kasutada turismiinfo.

### Autentimine
Mõned API tegevused on saadaval vaid kasutajale, kes on eelnevalt ennast autentinud. Selleks tuleb saata POST päring URL'ile `/api/v1/login` järgmise sisuga:

```
{
  "email": "kasutaja.email@domain.ee",
  "password": "kasutajaparool"
}
```

Kui vastavad email ja parool andmebaasist leitakse, siis tagastatakse sõnum:
```
{
  "success": true,
  "message": "token",
  "token": "tokeni sisu"
}
```
Selleks, et kasutada päringuid, mis nõuavad autentimist, tuleb tokeni sisu lisada päringu Auth Bearer osasse.

Mõnede tegevuste puhul (näiteks kohtade lisamine, muutmine ja kustutamine) on olulised ka kasutajaõigused, mis antakse kasutajatele lehe haldaja poolt.

API kasutamisel tuleb käituda järgmiselt:

Ürituste nimekirja GET päringu URL:  
`/api/v1/events`

Lühem nimekiri:  
`/api/v1/events/short`

Mõlema päringu puhul kuvatakse vaikimisi toimuvad üritused (status=1), ning ei kuvata planeerimisel olevaid (status=0).
Selleks, et näha planeeritavaid, tuleb URL'ile lisada GET päringu parameeter status=0
Samuti saab täpsustada ajavahemiku alates kuupäevast dateFrom ning kuni kuupäevani dateTo parameetriga. Ükski parameetritest ei ole kohustuslik ning nende puudumisel kasutatakse vaikimisi
väärtusi. Kuupäev peab olema formaadis 'yyyy-mm.dd'
Lisaks on võimalik küsida nimekirja korraldaja kohta. Selleks saab päringule lisada parameetri host korraldaja ID-ga.
Näiteks võiks päring välja näha järgmine:  
`/api/v1/events/short?id=0&datefrom=2022-10-11&host=1`

Ühe konkreetse kasutaja sündmusi saab vaadata GET päringuga  
`/api/v1/events/`, millele tuleb peale kaldkriipsu lisada kasutaja Id.

Sisse loginud kasutajad saavad uusi sündmusi lisada PUT päringuga:
`/api/v1/events/`. 

Muutmiseks ja kustutamiseks peab olema sisse loginud ja sündmuse ja kasutaja id peab olema sama. 

Muuta saab päringut POST päringuga, milles peavad olema kirjeldatud kõik vajalikud väljad.
Muudetakse seda kirjet, mille Id on saadetavas päringus.  
`/api/v1/events`

Sündmuse kustutamiseks kasutada DELETE käsku
`/api/v1/event/`, millele peale kaldkriipsu lisada kasutaja id, millele omakorda peale kaldriipsu lisada sündmuse id.


Sündmuste kirjel kohustuslikud kõikd väljad, välja arvatud need, mille taga on eraldi kommentaar.
Kirje struktuur on järgmine (väljanimi: andmetüüp):

```
{
id: // kohustuslik vaid kirje muutmisel
userId: number // kohustuslik kirje muutmisel, muul juhul mitte
eventType: string; //Teater, Kino, Festival, Kontsert, Muu
eventName: string; //ürituse nimi
description: string; //pikem selgitus ürituse kohta
startDate : string; //toimumiskuupäev vormingus 'yyyy-mm-dd'
startTime: string; // alguskellaaeg HH:mm
location: string; // asukoht
status: number; //0 üritus on planeerimisel, 1 üritus toimub
ticketPrice: number; //pileti hind, kui tasuta siis 0
ticketSale: string; // kus pileteid müüakse (Väravas või URL veebilehele)
}
```

Kasutajate halduseks on järgmised päringud:  
`GET /api/v1/users` kasutaja andmete küsimiseks  
`PUT /api/v1/users` kasutaja lisamiseks  
`POST /api/v1/users` kasutaja andmete muutmiseks  
`DELETE /api/v1/users/:id` kasutaja kustutamiseks (:id asendada kasutaja id-ga)
Kasutajat saab lisada ilma sisse logimata, kuid ülejäänud tegevused nõuavad sisselogimist ning administraatori õigusi.


Asukohtade halduseks on järgmised päringud:
`GET /api/v1/places` asukoha andmete küsimiseks  
`PUT /api/v1/places` asukoha lisamiseks  
`POST /api/v1/places` asukoha andmete muutmiseks  
`DELETE /api/v1/places/:id` asukoha kustutamiseks (:id asendada kasutaja id-ga)
Kohtade muutmine eeldab administraatoriõigusi.

kõik vastused tagastatakse JSON vormingus ning päringuvastus koosneb lisaks andmetele päisest:

```
{
  "success": true,
  "message": "List of events",
}
```

ning seejärel tagastatava ressursi nimi ning andmed.  


## Kasutamiseks vajalik tarkvara
Selleks, et see tarkvara töötaks on vaja GitHubis olevale paketile lisaks  tarkvara, mille leond ja installerimiseks vajalikud käsud on järgmised:

- **node.js** Tarkvara kasutamiseks peab rvutisse olema paigaldatud node.js (testitud on versioonil 18.8.0)
- **typescript** - paigaldamiseks npm install typescript
typescripti tüübidefinitsioonid - paigaldamiseks `npm install @types/node --save-dev`
- **nodemon** - paigaldamiseks `npm install --save-dev ts-node nodemon`
npm install -g node-gyp
- **bcrypt** - paigaldamiseks `npm install @types/bcrypt`
npm link bcrypt
- **jonewebtoken** - paigaldamiseks `npm install jsonwebtoken @types/jsonwebtoken`



npm install --save-dev mocha
npm install --save-dev @types/mocha

npm install --save-dev chai
npm install --save-dev @types/chai

cheatsheet https://devhints.io/chai

npm install --save-dev supertest 
npm install --save-dev @types/supertest

Testidega kaetus:
npm install nyc

package.json-i "test": "nyc mocha -r ts-node/register 'tests/**/*.ts'"
(enne "test": "echo \"Error: no test specified\" && exit 1",)

npm install swagger-autogen and swagger-ui-express
