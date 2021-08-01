CREATE TABLE IF NOT EXISTS HF_REGUSER (
	ID bigint PRIMARY KEY NOT NULL AUTO_INCREMENT,
	FIRST_NAME varchar(256) NOT NULL,
    LAST_NAME varchar(256) NOT NULL,
	BIRTH_DATE date NOT NULL,
	EMAIL_ADDRESS varchar(256) UNIQUE KEY NOT NULL,
	PHONE_NUMBER varchar(256),
	USERNAME varchar(256) UNIQUE KEY NOT NULL,
	INSERT_DATE timestamp NOT NULL DEFAULT current_timestamp,
	UPDATE_DATE timestamp ON UPDATE current_timestamp 
);
