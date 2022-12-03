CREATE VIEW EventList AS 
	SELECT 
	organizationID,
    ID AS eventID, 
    etype.name as "eventType",
    eventName,
    description,
    startTime,
    pl.name as "place",
    placeDescription,
    ticketPrice,
    ticketSaleOnLine,
    ticketSaleAtDoor
    FROM Event e
    LEFT JOIN EventType etype ON e.eventTypeID = etype.ID 
    LEFT JOIN Place pl ON e.placeID = pl.ID 
    WHERE public IS TRUE AND deleteDate IS NULL 
    ORDER BY startTime;
    
CREATE VIEW EventProgram AS 
	SELECT 
    eventID,
    e.eventName as eventName,
    name,
    p.description AS description,
    p.startTime AS startTime
    FROM Program p
    LEFT JOIN Event e ON p.eventID=e.ID  
    WHERE p.deleteDate IS NULL 
    ORDER BY p.startTime;
