/* ALTER TABLE Organization AUTO_INCREMENT=1; */
INSERT INTO Organization (name) VALUES ('Test');
INSERT INTO Organization (name) VALUES ('Haapsalu Kultuurikeskus');
INSERT INTO Organization (name) VALUES ('SEE Teater');
INSERT INTO Organization (name) VALUES ('Haapsalu Kunstikool');
INSERT INTO Organization (name) VALUES ('Rannarootsi Muuseum');

INSERT INTO EventType (name) VALUES ('Festival');
INSERT INTO EventType (name) VALUES ('Teater');
INSERT INTO EventType (name) VALUES ('Kino');
INSERT INTO EventType (name) VALUES ('Kontsert');
INSERT INTO EventType (name) VALUES ('Näitus');

/*
INSERT INTO Status (ID, name) VALUES (0, 'Planeerimisel');
INSERT INTO Status (ID, name) VALUES (1, 'Toimub');
*/

INSERT INTO Place (name, address) VALUES ('Kultuurimaja', 'Posti 3, Haapsalu');