CREATE TABLE IF NOT EXISTS HF_APP (
	ID bigint PRIMARY KEY NOT NULL AUTO_INCREMENT,
    IP varchar(100) NOT NULL,
   	NAME varchar(500) NOT NULL,
	TOKEN varchar(1000) NOT NULL,
	INSERT_DATE timestamp NOT NULL DEFAULT current_timestamp,
	UPDATE_DATE timestamp ON UPDATE current_timestamp
);
