MisToimub on õppeotstarbel loodud tarkvara pakett ja seetõttu mitte tavapäraseks kasutamiseks

Tarkvara eesmärgiks on luua serveri tarkvara linna ürituste kava haldamiseks.
Kasutajateks oleksid ürituste korraldajad, kes saavad oma üritusi läbi selle kava reklaamida.
Kava on võimalik kasutada ka planeerimiseks, kuna sinna saab lisada ka üritusi, mis ei ole
veel välja kuulutatud, kuid on planeerimisel. See aitaks vältida sarnaste ürituste planeerimist
samale ajale.

Läbi API saavad selle kava lisada oma kodulehele ka näiteks hotellid, kes saavad oma külastajale
pakkuda ülevaadet linnas toimuva kohta. Samuti saaks seda oma kodulehel kasutada turismiinfo.

Selleks, et see tarkvara töötaks on vaja GitHubis olevale paketile vajalik tarkvada, mille leond
ja installerimiseks vajalikud käsud on järgmised:

Arvutisse peab olema paigaldatud node.js (testitud on versioonil 18.8.0)
typescript - paigaldamiseks npm install typescript
typescripti tüübidefinitsioonid - paigaldamiseks npm install @types/node --save-dev
nodemon - paigaldamiseks npm install --save-dev ts-node nodemon



