USE MisToimub;

/* paroolid kõigil dontellya */

INSERT INTO User 
	(name, surname, email, password, admin, organizationID)
VALUES
	('Andrus', 'Küünarpuu', 'andrus@tlu.ee', '$2b$10$5cPmfAN4v9S6BUQY9.xoFu4qaqUZdD2glzqlsbuFZj/TR7l6DP.cy', TRUE, 1);
    
INSERT INTO User 
	(name, surname, email, password, admin, organizationID)
VALUES
	('Arabella', 'Koer', 'arabella@xxx.ee', '$2b$10$wJsG.4qrMk8UiXhEZ/zG2.T56f./UgkDfdZRGhRzY1nGF6XToql2O', FALSE, 2);
    

