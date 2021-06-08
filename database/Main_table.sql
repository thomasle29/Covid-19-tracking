DROP DATABASE covid_19_db;
CREATE DATABASE IF NOT EXISTS covid_19_db;

-- Create table information
CREATE TABLE IF NOT EXISTS covid_19_db.infor(
	infor_id VARCHAR(36) NOT NULL,
    infor_name VARCHAR(50) NOT NULL,
    infor_phone VARCHAR(12) NOT NULL,
    infor_address VARCHAR(20) NOT NULL,
    infor_year VARCHAR(4) NOT NULL,
    PRIMARY KEY (infor_id)
);

-- Create table relatives
-- DROP TABLE covid_19_db.relative;
CREATE TABLE IF NOT EXISTS covid_19_db.relative(
	relative_id VARCHAR(36) NOT NULL,
    relative_from VARCHAR(36) NOT NULL,
    relative_to VARCHAR(36) NOT NULL,
    `timestamp` VARCHAR(40) NOT NULL,
    PRIMARY KEY (relative_id),
    FOREIGN KEY (relative_from) REFERENCES covid_19_db.infor(infor_id),
    FOREIGN KEY (relative_to) REFERENCES covid_19_db.infor(infor_id)
);