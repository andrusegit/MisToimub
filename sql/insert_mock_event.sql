INSERT INTO Event 
	SET
	organizationID = 1,
    eventTypeID = 3,
    eventName = "Test Event",
    description = "",
    startTime = "2022-12-01 17:00",
    placeID = 1,
    placeDescription = "",
    published = true,
    ticketPrice = 10.00,
    ticketSaleOnLine = "",
    ticketSaleAtDoor = true;

INSERT INTO Event (
    organizationID,
    eventTypeID,
    eventName,
    description,
    startTime,
    placeID,
    placeDescription,
    published,
    ticketPrice,
    ticketSaleOnLine,
    ticketSaleAtDoor )
VALUES (
    2 ,
    1,
    'Kapsapea',
    'Oskar Lutsu kapsapea, mis iganes seal ka sisu ei oleks',
    '2022-10-28 19:00:00',
    1,
    NULL,
    TRUE,
    15,
    NULL,
    TRUE )
;

INSERT INTO Program 
	SET
    eventID=1,
    name="Test program item",
    description="Just for testing purposes",
    startTime="2022-12-01 17:00",
    deleteDate=NULL
;

