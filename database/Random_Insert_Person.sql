-- Inserter Table
CREATE TABLE IF NOT EXISTS covid_19_db.full_name(
	full_name VARCHAR(40) NOT NULL
);

CREATE TABLE IF NOT EXISTS covid_19_db.first_name(
	first_name_text VARCHAR(10) NOT NULL
);

CREATE TABLE IF NOT EXISTS covid_19_db.middle_name(
	middle_name_text VARCHAR(10) NOT NULL
);

CREATE TABLE IF NOT EXISTS covid_19_db.last_name(
	last_name_text VARCHAR(10) NOT NULL
);

-- Insert name
INSERT INTO covid_19_db.first_name(first_name_text)
VALUES ('An'),('Binh'),('Cuong'),('Dung'),('Lan'),('Khang'),('Linh'),('Nam'),('Hieu'),('Vy'),('Phong');

INSERT INTO covid_19_db.middle_name(middle_name_text)
VALUES ('Thi'),('Van'),('Hong'),('Kim'),('Ngoc'),('Anh'),('Trong'),('Phuong'),('Gia'),('Quang');

INSERT INTO covid_19_db.last_name(last_name_text)
VALUES ('Nguyen'),('Le'),('Nguyen'),('Pham'),('Ly'),('Lam'),('Tran'),('Luong');

INSERT INTO covid_19_db.full_name
	SELECT 
		CONCAT(last_name_text,' ',middle_name_text,' ',first_name_text) 
	FROM covid_19_db.last_name, covid_19_db.middle_name, covid_19_db.first_name;
    
-- Insert into information table 
INSERT INTO covid_19_db.infor (infor_id, infor_name, infor_phone, infor_year)
SELECT 
	UUID(),
	fn.full_name, 
	CONCAT('0',
		CONVERT(LPAD(FLOOR(RAND() * 10000000000), 9, '0'),CHAR)	
	),
    FLOOR(RAND()*(2010-1950+1))+1950
FROM covid_19_db.full_name fn; 
