DROP DATABASE IF EXISTS lldatabase;

CREATE DATABASE lldatabase;

USE lldatabase;

CREATE TABLE users(
    USERID INT NOT NULL AUTO_INCREMENT,
    USERNAME VARCHAR(64) NULL,
    PWD VARCHAR(64) NOT NULL,
    EMAIL VARCHAR(64) NULL,
    JOIN_DATE DATE NOT NULL,
    PRIMARY KEY (USERID)
);

CREATE TABLE facilities(
    BATHROOMID INT NOT NULL AUTO_INCREMENT,
    LOCATIONA VARCHAR(128),
    ACCESSIBILITY BOOLEAN,
    DIAPER_STATION BOOLEAN,
    RATING FLOAT NULL,
    NUMRATINGS INT NULL,
    PRIMARY KEY (BATHROOMID)
);

CREATE TABLE reviews(
    REVIEWID INT NOT NULL AUTO_INCREMENT,
    USERID INT,
    FACILITYID INT,
    FOREIGN KEY (USERID) REFERENCES users(USERID),
    FOREIGN KEY (FACILITYID) REFERENCES facilities(BATHROOMID),
    COMMENT VARCHAR(1024) NULL,
    PRIMARY KEY (REVIEWID)
);