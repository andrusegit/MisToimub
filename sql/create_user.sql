CREATE USER 'wwwuser'@'%' IDENTIFIED BY 'paruul';
GRANT SELECT, INSERT, UPDATE, DELETE ON `%`.* TO `wwwuser`@`%`;


/*
use MisToimub;
show tables;
select * from Organization;
*/