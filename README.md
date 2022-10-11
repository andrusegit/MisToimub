MisToimub on õppeotstarbel loodud tarkvara ja seetõttu mitte tavapäraseks kasutamiseks

Tarkvara eesmärgiks on luua serveri tarkvara linna ürituste kava haldamiseks.
Kasutajateks oleksid ürituste korraldajad, kes saavad oma üritusi läbi selle kava reklaamida.
Kava on võimalik kasutada ka planeerimiseks, kuna sinna saab lisada ka üritusi, mis ei ole
veel välja kuulutatud, kuid on planeerimisel. See aitaks vältida sarnaste ürituste planeerimist
samale ajale.

Läbi API saavad selle kava lisada oma kodulehele ka näiteks hotellid, kes saavad oma külastajale
pakkuda ülevaadet linnas toimuva kohta. Samuti saaks seda oma kodulehel kasutada turismiinfo.

Selleks, et see tarkvara töötaks on vaja GitHubis olevale paketile vajalik tarkvara, mille leond
ja installerimiseks vajalikud käsud on järgmised:

API kasutamisel tuleb käituda järgmiselt:

Ürituste nimekirja GET päringu URL:
'/api/v1/eventlist'

Lühem nimekiri:
'/api/v1/eventlist/short'

Mõlema päringu puhul kuvatakse vaikimisi toimuvad üritused (status=1), ning ei kuvata planeerimisel olevaid (status=0).
Selleks, et näha planeeritavaid, tuleb URL'ile lisada GET päringu parameeter status=0
Samuti saab täpsustada ajavahemiku alates kuupäevast dateFrom ning kuni kuupäevani dateTo parameetriga. Ükski parameetritest ei ole kohustuslik ning nende puudumisel kasutatakse vaikimisi
väärtusi. Kuupäev peab olema formaadis 'yyyy-mm.dd'
Lisaks on võimalik küsida nimekirja sündmuskoha kohta. Selleks saab päringule lisada parameetri place.
Näiteks võiks päring välja näha järgmine:
'/api/v1/eventlist/short?id=0&datefrom=2022-10-11&place=Kultuurimaja'

Registreeritud kasutaja saab vaadata enda poolt sisestatud sündmuseid GET päringuga
'/api/v1/usereventlist/', millele tuleb peale kaldkriipsu lisada kasutaja Id.

Registreeritud kasutajad saavad uusi sündmusi lisada PUT päringuga:
'/api/v1/usereventlist/', peale kaldkriipsu tuleb lisada kasutaja Id

Muuta saab päringut POST päringuga, milles peavad olema kirjeldatud kõik vajalikud väljad.
Muudetakse seda kirjet, mille Id on saadetavas päringus.
'/api/v1/usereventlist'

Sündmuse kustutamiseks kasutada DELETE käsku
'/api/v1/usereventlist/, millele peale kaldkriipsu lisada kasutaja id, millele omakorda peale kaldriipsu lisada sündmuse id.


Sündmuste kirjel kohustuslikud kõikd väljad, välja arvatud need, mille taga on eraldi kommentaar.
Kirje struktuur on järgmine (väljanimi: andmetüüp):

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


Kasutajate halduseks on järgmised päringud
GET '/api/v1/user' kasutaja andmete küsimiseks
PUT '/api/v1/user' kasutaja lisamiseks
POST '/api/v1/user' kasutaja andmete muutmiseks
DELETE '/api/v1/user/:id' kasutaja kustutamiseks (:id asendada kasutaja id-ga)

kõik vastused tagastatakse JSON vormingus


Tarkvara kasutamiseks peab rvutisse olema paigaldatud node.js (testitud on versioonil 18.8.0)
typescript - paigaldamiseks npm install typescript
typescripti tüübidefinitsioonid - paigaldamiseks npm install @types/node --save-dev
nodemon - paigaldamiseks npm install --save-dev ts-node nodemon



